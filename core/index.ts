import m = require('mithril/hyperscript');
import UIComponent from './component';
import {VNode} from './interfaces';

interface ComponentsMap {
    [key: string]: {
        new (): UIComponent
    };
}

const components: ComponentsMap = {};

export {UIComponent};

export function jsx(selector: string, attributes: Object, ...children: Mithril.Children[]) {
    return m(selector, attributes, children);
}

export function createComponent(name: string, Component) {
    components[name] = Component;
}

export function activateNode(node: HTMLElement) {
    const name = node.tagName.toLowerCase();
    const children = Array.prototype.slice.apply(node.childNodes);
    const Component = components[name];
    const component = new Component();
    component.node = node;
    component.helper = {
        region() {
            return m('span', {
                className: 'todo-remove-me',
                oncreate(vnode: VNode) {
                    children.forEach(node => vnode.dom.parentNode.appendChild(node));
                }
            })
        }
    };
    Object.defineProperty(node, 'kComponent', {value: component});
    component.update();
}

export function activate() {
    const nodes = document.querySelectorAll(Object.keys(components).join(','));
    Array.prototype.forEach.call(nodes, activateNode)
}
