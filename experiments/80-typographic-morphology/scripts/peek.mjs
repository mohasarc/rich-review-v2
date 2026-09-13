import { git, describeModule, MAIN_SHA, TIP_SHA } from "./lib.mjs";
const [sha, file] = process.argv.slice(2);
const src = git("show", `${sha}:${file}`);
const d = describeModule(src, file);
console.log("lines", d.lines, "exports", d.exports.join(","));
for (const i of d.imports) console.log("  import", i.typeOnly ? "type" : "    ", i.spec, "{", i.names.join(", "), "}");
for (const c of d.classes) {
  console.log("class", c.name, c.start, "-", c.end, "exported", c.exported);
  for (const m of c.members) console.log("   ", m.visibility.padEnd(9), m.kind.padEnd(11), (m.static?"static ":"")+m.name, `${m.end-m.start+1}L`);
}
