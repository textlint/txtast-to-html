import { toHTML } from "../src/txtast-to-html";
import * as assert from "assert";
import { TxtNode, TxtParentNode } from "@textlint/ast-node-types";

const { parse } = require("markdown-to-ast");
describe("toHTML", () => {
    it("convert AST to html", () => {
        let txtAST = parse(`# Title
    
text [link](http://example.com).

- list1
- list2

`);
        const HTMLString = toHTML(txtAST);
        assert.strictEqual(typeof HTMLString, "string");
    });
    it("work with option", () => {
        let txtAST = parse(`# Title
    
text [link](http://example.com).

- list1
- list2

`);
        const HTMLString = toHTML(txtAST, {
            openNode(txtNode: TxtNode | TxtParentNode): string {
                if (!txtNode.children) {
                    return `<${txtNode.type}>${txtNode.raw}</${txtNode.type}>`;
                }
                return `<${txtNode.type}>`;
            },
            closeNode(txtNode: TxtNode | TxtParentNode): string {
                if (!txtNode.children) {
                    return "";
                }
                return `</${txtNode.type}>`;
            }
        });
        assert.strictEqual(
            HTMLString,
            `<Document><Header><Str>Title</Str></Header><Paragraph><Str>text </Str><Link><Str>link</Str></Link><Str>.</Str></Paragraph><List><ListItem><Paragraph><Str>list1</Str></Paragraph></ListItem><ListItem><Paragraph><Str>list2</Str></Paragraph></ListItem></List></Document>`
        );
    });
});
