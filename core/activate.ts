import m = require("mithril/hyperscript");
import {UIComponentConstructor} from "./component";
import {RegionsMap, ComponentElement} from "./interfaces";
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
    function attachHtml(vnode: Mithril.VnodeDOM<null, {element: Element}>) {
        if (!vnode.state.element) {
            vnode.state.element = vnode.dom.parentElement;
        }
        const parentElement = vnode.state.element;
        parentElement.innerHTML = "";
        html.forEach(node => parentElement.appendChild(node));
    }

    return {
        tag: "[",
        state: {},
        attrs: {
            oncreate: attachHtml,
            onupdate: attachHtml,
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
    if ((node as ComponentElement).kComponent) {
        return;
    }
    const name = node.tagName.toLowerCase();
    const children = Array.prototype.slice.apply(node.childNodes);
    const Component = components[name];
    instantiateComponent(node, Component, htmlToRegions(children));
}

export function activate(): void {
    const nodes = document.querySelectorAll(Object.keys(components).join(","));
    Array.prototype.forEach.call(nodes, activateNode);
}
