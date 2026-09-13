from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

directory = Path(__file__).resolve().parents[1]
server = ThreadingHTTPServer(('127.0.0.1', 0), partial(SimpleHTTPRequestHandler, directory=str(directory)))
print(f'Open http://127.0.0.1:{server.server_port}/game.html', flush=True)
try:
    server.serve_forever()
except KeyboardInterrupt:
    server.server_close()
