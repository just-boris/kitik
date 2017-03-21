import m = require("mithril/hyperscript");
import UIComponent from "./component";
import {ComponentElement, VNode} from "./interfaces";

interface ComponentsMap {
    [key: string]: {
        new (): UIComponent,
    };
}

const components: ComponentsMap = {};

export {UIComponent, ComponentElement};

export function jsx(selector: string, attributes: Object, ...children: Mithril.Children[]) {
    return m(selector, attributes, children);
}

export function createComponent(name: string): ClassDecorator {
    return Component => {
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
        region(): VNode {
            return {
                tag: "[",
                dom: undefined,
                attrs: {
                    oncreate(vnode: VNode) {
                        children.forEach(childNode => vnode.dom.parentNode.appendChild(childNode));
                    },
                },
                children: [{
                    tag: "#",
                    attrs: {},
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
