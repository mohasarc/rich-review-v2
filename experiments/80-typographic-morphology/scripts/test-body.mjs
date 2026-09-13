import ts from "typescript";
import { git, parse } from "./lib.mjs";
const [sha, file, needle] = process.argv.slice(2);
const src = git("show", `${sha}:${file}`);
const sf = parse(src, file);
const visit = (n) => {
  if (ts.isCallExpression(n) && ["it","test"].includes(n.expression.getText(sf).split(".")[0])) {
    const a = n.arguments[0];
    if (a && ts.isStringLiteral(a) && a.text.includes(needle)) {
      const s = sf.getLineAndCharacterOfPosition(n.getStart()).line + 1;
      const e = sf.getLineAndCharacterOfPosition(n.getEnd()).line + 1;
      console.log(`--- ${sha.slice(0,9)} ${file}:${s}-${e}`);
      console.log(n.getText(sf));
    }
  }
  ts.forEachChild(n, visit);
};
visit(sf);
