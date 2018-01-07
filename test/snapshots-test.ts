import * as path from "path";
import * as fs from "fs";
import * as assert from "assert";
import { toHTML } from "../src/txtast-to-html";
import { TxtParentNode } from "@textlint/ast-node-types";
import { JSDOM } from "jsdom";

const { parse } = require("markdown-to-ast");
const fixturesDir = path.join(__dirname, "snapshots");
describe("Snapshot testing", () => {
    fs.readdirSync(fixturesDir).map(caseName => {
        it(`Test ${caseName.replace(/-/g, " ")}`, function() {
            const fixtureDir = path.join(fixturesDir, caseName);
            const actualPath = path.join(fixtureDir, "input.md");
            const actualContent: TxtParentNode = parse(fs.readFileSync(actualPath, "utf-8"));
            const actual = toHTML(actualContent);
            const outputFilePath = path.join(fixtureDir, "output.html");
            if (process.env.SNAPSHOT_UPDATE) {
                fs.writeFileSync(outputFilePath, actual, "utf-8");
                this.skip();
                return;
            }
            // Test
            const expected: string = fs.readFileSync(outputFilePath, "utf-8");
            assert.strictEqual(
                actual,
                expected,
                `
${actualPath}
${actual}
`
            );

            // meta-data test
            const dom = new JSDOM(actual);
            const document = dom.window.document;
            const nodes = document.querySelectorAll("[data-metadata]");
            Array.from(nodes).forEach(node => {
                const metadata = JSON.parse((node as HTMLElement).dataset.metadata!);
                if (metadata.value) {
                    assert.strictEqual(typeof metadata.value, "string");
                }
                assert.strictEqual(typeof metadata.loc, "object");
                assert.ok(Array.isArray(metadata.range));
            });
        });
    });
});
