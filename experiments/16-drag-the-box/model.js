(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.MoveModel = api;
})(typeof window === 'undefined' ? globalThis : window, function () {
  const normalize = value => {
    const parts = [];
    for (const part of value.split('/')) {
      if (part === '..') parts.pop();
      else if (part && part !== '.') parts.push(part);
    }
    return parts.join('/');
  };
  const dirname = file => file.slice(0, file.lastIndexOf('/'));
  const relative = (from, to) => {
    const a = dirname(from).split('/');
    const b = to.split('/');
    while (a.length && b.length && a[0] === b[0]) { a.shift(); b.shift(); }
    const result = [...a.map(() => '..'), ...b].join('/').replace(/\.ts$/, '.js');
    return result.startsWith('.') ? result : './' + result;
  };
  class MoveModel {
    constructor(data, revision = 'head', moves = {}) { this.data = data; this.revision = revision; this.moves = moves; this.snapshot = data.snapshots[revision]; }
    packageOf(file) { return this.data.packages.find(p => file.startsWith(p.dir + '/'))?.id || (file.startsWith('external:') ? 'external' : 'meta'); }
    location(file) {
      const destination = this.moves[file];
      if (!destination || destination === 'cli' || !this.snapshot.files[file]) return file;
      const pkg = this.data.packages.find(p => p.id === destination);
      return pkg.dir + '/' + file.replace(/^apps\/cli\//, '');
    }
    assess(edge) {
      const from = this.location(edge.from);
      const to = this.location(edge.to);
      const fromPackage = this.packageOf(from);
      const toPackage = this.packageOf(to);
      const source = this.snapshot.files[edge.from];
      const definition = this.data.packages.find(p => p.id === fromPackage);
      const affected = from !== edge.from || to !== edge.to;
      const crossed = fromPackage !== toPackage && fromPackage !== 'meta' && toPackage !== 'meta' && toPackage !== 'external';
      const forbidden = crossed && !definition?.allow.includes(toPackage) && !(source?.test && toPackage === 'testing');
      const relativeImport = edge.specifier.startsWith('.');
      const rawTarget = normalize(dirname(from) + '/' + edge.specifier).replace(/\.js$/, '.ts');
      const addressBroken = relativeImport && rawTarget !== to;
      const exportNeeded = affected && relativeImport && crossed;
      const targetPackage = this.data.packages.find(p => p.id === toPackage);
      const suggested = relativeImport ? crossed ? (toPackage === 'cli' ? 'symnav' : targetPackage?.name || edge.specifier) : relative(from, to) : edge.specifier;
      return { ...edge, fromLocation: from, toLocation: to, fromPackage, toPackage, affected, crossed, forbidden, addressBroken, exportNeeded, suggested };
    }
    edges() { return this.snapshot.edges.map(edge => this.assess(edge)); }
    impact() {
      const edges = this.edges().filter(e => e.affected);
      return { edges, addresses: edges.filter(e => e.addressBroken).length, forbidden: edges.filter(e => e.forbidden).length, exports: new Set(edges.filter(e => e.exportNeeded).map(e => e.toLocation)).size, moved: Object.keys(this.moves).filter(file => this.snapshot.files[file] && this.moves[file] !== 'cli').length };
    }
  }
  return { MoveModel, relative, normalize };
});
