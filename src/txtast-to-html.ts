import { TxtNode, TxtParentNode } from "@textlint/ast-node-types";
import { traverse } from "txt-ast-traverse";

const escapeGoat: {
    escape(html: string): string;
    unescape(html: string): string;
} = require("escape-goat");
const omitKeyList = ["type", "children", "parent", "raw"];
const Prefix = "txtast";
export const getOwnSourceStart = (node: TxtNode): string => {
    if (!node.children || node.children.length === 0) {
        return node.raw;
    }
    const ownStart = node.range[0];
    const firstNodeStart = node.children[0].range[0];
    if (ownStart === firstNodeStart) {
        return "";
    }
    return node.raw.slice(0, firstNodeStart - ownStart);
};
export const getOwnSourceEnd = (node: TxtNode): string => {
    if (!node.children || node.children.length === 0) {
        return node.raw;
    }
    const ownEnd = node.range[0];
    const lastNodeEnd = node.children[node.children.length - 1].range[1];
    if (ownEnd === lastNodeEnd) {
        return "";
    }
    return node.raw.slice(lastNodeEnd - ownEnd);
};
const omitKeyReplacer = (key: string, value: any) => {
    if (omitKeyList.indexOf(key) !== -1) {
        return undefined;
    }
    return value;
};
export const defaultOpenNode = (txtNode: TxtNode | TxtParentNode): string => {
    const metadata = JSON.stringify(txtNode, omitKeyReplacer);
    const nodeType = txtNode.type.toLowerCase();
    if (!txtNode.children) {
        return `<${Prefix}-${nodeType} data-metadata="${escapeGoat.escape(metadata)}">${escapeGoat.escape(
            txtNode.raw
        )}</${Prefix}-${nodeType}>`;
    }
    const symbol = escapeGoat.escape(getOwnSourceStart(txtNode));
    return `<${Prefix}-${nodeType} data-metadata="${escapeGoat.escape(metadata)}">${symbol}`;
};
export const defaultCloseNode = (txtNode: TxtNode | TxtParentNode): string => {
    if (!txtNode.children) {
        return "";
    }
    const nodeType = txtNode.type.toLowerCase();
    const symbol = escapeGoat.escape(getOwnSourceEnd(txtNode));
    return `${symbol}</${Prefix}-${nodeType}>`;
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
