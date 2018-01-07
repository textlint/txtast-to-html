import { TxtNode, TxtParentNode } from "@textlint/ast-node-types";
import { traverse } from "txt-ast-traverse";

const escapeGoat: {
    escape(html: string): string;
    unescape(html: string): string;
} = require("escape-goat");
const omitKeyList = ["type", "children", "parent", "raw"];
const omitKeyReplacer = (key: string, value: any) => {
    if (omitKeyList.indexOf(key) !== -1) {
        return undefined;
    }
    return value;
};
export const defaultOpenNode = (txtNode: TxtNode | TxtParentNode): string => {
    const metadata = JSON.stringify(txtNode, omitKeyReplacer);
    if (!txtNode.children) {
        return `<${txtNode.type} data-metadata="${escapeGoat.escape(metadata)}">${escapeGoat.escape(txtNode.raw)}</${
            txtNode.type
        }>`;
    }
    return `<${txtNode.type}>`;
};
export const defaultCloseNode = (txtNode: TxtNode | TxtParentNode): string => {
    if (!txtNode.children) {
        return "";
    }
    return `</${txtNode.type}>`;
};

export interface ToHTMLOptions {
    openNode(txtNode: TxtNode | TxtParentNode): string;

    closeNode(txtNode: TxtNode | TxtParentNode): string;
}

export const toHTML = (txtAST: TxtParentNode, options?: ToHTMLOptions): string => {
    const openNode = options && options.openNode ? options.openNode : defaultOpenNode;
    const closeNode = options && options.closeNode ? options.closeNode : defaultCloseNode;
    const traverseNodeList: string[] = [];
    traverse(txtAST, {
        enter(node: TxtParentNode | TxtNode) {
            traverseNodeList.push(openNode(node));
        },
        leave(node: TxtParentNode | TxtNode) {
            traverseNodeList.push(closeNode(node));
        }
    });
    return traverseNodeList.join("");
};
