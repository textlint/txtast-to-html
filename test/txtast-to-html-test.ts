import { getOwnSourceEnd, getOwnSourceStart, toHTML } from "../src/txtast-to-html";
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
                const nodeType = txtNode.type.toLowerCase();
                if (!txtNode.children) {
                    return `<txtast-${nodeType}>${txtNode.raw}</txtast-${nodeType}>`;
                }
                console.log(getOwnSourceStart(txtNode), nodeType);
                return `<txtast-${nodeType}>${getOwnSourceStart(txtNode)}`;
            },
            closeNode(txtNode: TxtNode | TxtParentNode): string {
                const nodeType = txtNode.type.toLowerCase();
                if (!txtNode.children) {
                    return "";
                }
                return `${getOwnSourceEnd(txtNode)}</txtast-${nodeType}>`;
            }
        });
        assert.strictEqual(
            HTMLString,
            `<txtast-document><txtast-header># <txtast-str>Title</txtast-str></txtast-header><txtast-paragraph><txtast-str>text </txtast-str><txtast-link>[<txtast-str>link</txtast-str>](http://example.com)</txtast-link><txtast-str>.</txtast-str></txtast-paragraph><txtast-list><txtast-listitem>- <txtast-paragraph><txtast-str>list1</txtast-str></txtast-paragraph></txtast-listitem><txtast-listitem>- <txtast-paragraph><txtast-str>list2</txtast-str></txtast-paragraph></txtast-listitem></txtast-list>

</txtast-document>`
        );
    });
});
