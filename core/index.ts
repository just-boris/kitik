import renderer = require('mithril/render');
import m = require('mithril/hyperscript');

interface VNode extends Mithril.VirtualElement {
    dom: HTMLElement;
}

export abstract class UIComponent {
    node: HTMLElement;
    abstract render(helper: any): Mithril.Children;
}

interface ComponentsMap {
    [key: string]: {
        new (): UIComponent
    };
}

const components: ComponentsMap = {};

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
    Object.defineProperty(node, 'kComponent', {value: component});
    const helper = {
        region() {
            return m('span', {
                className: 'todo-remove-me',
                oncreate(vnode: VNode) {
                    children.forEach(node => vnode.dom.parentNode.appendChild(node));
                }
            })
        }
    };
    renderer.render(node, component.render(helper));
}

export function activate() {
    const nodes = document.querySelectorAll(Object.keys(components).join(','));
    Array.prototype.forEach.call(nodes, activateNode)
}
