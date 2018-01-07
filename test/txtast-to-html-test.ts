import { toHTML } from "../src/txtast-to-html";
import * as assert from "assert";

const { parse } = require("markdown-to-ast");
describe("toHTML", () => {
    it("convert AST to html", () => {
        const HTMLString = toHTML(
            parse(`# Title
        
text [link](http://example.com).

- list1
- list2

`)
        );
        assert.strictEqual(typeof HTMLString, "string");
    });
});
