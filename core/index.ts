import m = require("mithril/hyperscript");
import UIComponent, {UIComponentConstructor} from "./component";
import {ComponentElement} from "./interfaces";
import MithrilView from "./mithrill-view";

interface ComponentsMap {
    [key: string]: UIComponentConstructor;
}

const components: ComponentsMap = {};

export {UIComponent, ComponentElement};

export function jsx(Selector: string | UIComponentConstructor, attributes: Object, ...children: Mithril.Children[]) {
    if (typeof Selector === "function") {
        return m(MithrilView, {Component: Selector, originalAttrs: attributes}, ...children);
    } else {
        return m(Selector, attributes, children);
    }
}

export function createComponent(name: string): ClassDecorator {
    return (Component: UIComponentConstructor) => {
        Component.displayName = name;
        components[name] = Component;
    };
}

export function activateNode(node: HTMLElement): void {
    const name = node.tagName.toLowerCase();
    const children = Array.prototype.slice.apply(node.childNodes);
    const Component = components[name];
    const component = new Component();
    component.node = node;
    component.helper = {
        region(): Mithril.Children {
            return {
                tag: "[",
                state: null,
                attrs: {
                    oncreate(vnode: Mithril.VnodeDOM<null, null>) {
                        children.forEach(childNode => vnode.dom.parentNode.appendChild(childNode));
                    },
                },
                children: [{
                    tag: "#",
                    state: null,
                    attrs: null,
                    children: [],
                }],
            };
        },
    };
    (node as ComponentElement).kComponent = component;
    component.update();
}

export function activate(): void {
    const nodes = document.querySelectorAll(Object.keys(components).join(","));
    Array.prototype.forEach.call(nodes, activateNode);
}
