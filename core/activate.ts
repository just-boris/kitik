import m = require("mithril/hyperscript");
import {UIComponentConstructor} from "./component";
import {RegionsMap} from "./interfaces";
import {instantiateComponent} from "./mithrill-view";

interface ComponentsMap {
    [key: string]: UIComponentConstructor;
}

const components: ComponentsMap = {};

export function createComponent(name: string): ClassDecorator {
    return (Component: UIComponentConstructor) => {
        Component.displayName = name;
        components[name] = Component;
    };
}

function htmlToVNode(html: Element[]) {
    return {
        tag: "[",
        state: null,
        attrs: {
            oncreate(vnode: Mithril.VnodeDOM<null, null>) {
                html.forEach(node => vnode.dom.parentNode.appendChild(node));
            },
        },
        children: [{
            tag: "#",
            state: null,
            attrs: null,
            children: [],
        }],
    };
}

function htmlToRegions(html: Element[]): RegionsMap {
    const regions = {};
    const defaultRegion = [];
    html.forEach(node => {
        const name = node.nodeType === node.ELEMENT_NODE && node.getAttribute("data-region");
        if (name) {
            regions[name] = htmlToVNode([node]);
        } else {
            defaultRegion.push(node);
        }
    });
    regions["default"] = htmlToVNode(defaultRegion);
    return regions;
}

export function activateNode(node: Element): void {
    const name = node.tagName.toLowerCase();
    const children = Array.prototype.slice.apply(node.childNodes);
    const Component = components[name];
    instantiateComponent(node, Component, htmlToRegions(children));
}

export function activate(): void {
    const nodes = document.querySelectorAll(Object.keys(components).join(","));
    Array.prototype.forEach.call(nodes, activateNode);
}
