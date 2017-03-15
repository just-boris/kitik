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

export function activate(node: HTMLElement) {
    const name = node.tagName.toLowerCase();
    const children = Array.prototype.slice.apply(node.childNodes);
    const Component = components[name];
    const component = new Component();
    component.node = node;
    const helper = {
        region() {
            return m('div', {
                oncreate(vnode: VNode) {
                    const tmpNode = vnode.dom;
                    tmpNode.parentNode.replaceChild(children[0], tmpNode);
                }
            })
        }
    };
    renderer.render(node, component.render(helper));
}
