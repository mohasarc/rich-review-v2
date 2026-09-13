"""Serve the experiment locally, including byte ranges for seeking audio/video."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from functools import partial
from pathlib import Path
import argparse, os, re

class ReviewHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        self.remaining = None
        path = self.translate_path(self.path)
        if os.path.isdir(path) or not self.headers.get('Range'):
            return super().send_head()
        try:
            stream = open(path, 'rb')
        except OSError:
            self.send_error(404, 'File not found')
            return None
        size = os.fstat(stream.fileno()).st_size
        match = re.fullmatch(r'bytes=(\d*)-(\d*)', self.headers['Range'])
        try:
            if not match or not any(match.groups()):
                raise ValueError
            first, last = match.groups()
            start = int(first) if first else max(0, size-int(last))
            end = min(size-1, int(last)) if first and last else size-1
            if start < 0 or start > end or start >= size:
                raise ValueError
        except ValueError:
            stream.close()
            self.send_response(416)
            self.send_header('Content-Range', f'bytes */{size}')
            self.send_header('Content-Length', '0')
            self.end_headers()
            return None
        self.send_response(206)
        self.send_header('Content-Type', self.guess_type(path))
        self.send_header('Accept-Ranges', 'bytes')
        self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
        self.send_header('Content-Length', str(end-start+1))
        self.end_headers()
        stream.seek(start)
        self.remaining = end-start+1
        return stream

    def copyfile(self, source, output):
        if self.remaining is None:
            try:
                return super().copyfile(source, output)
            except (BrokenPipeError, ConnectionResetError):
                return
        remaining = self.remaining
        try:
            while remaining:
                data = source.read(min(65536, remaining))
                if not data:
                    break
                output.write(data)
                remaining -= len(data)
        except (BrokenPipeError, ConnectionResetError):
            return

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port', type=int, default=8721)
    args = parser.parse_args()
    handler = partial(ReviewHandler, directory=str(Path(__file__).resolve().parent))
    server = ThreadingHTTPServer(('127.0.0.1', args.port), handler)
    print(f'Open http://127.0.0.1:{args.port}/ — Ctrl-C stops the preview.', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
