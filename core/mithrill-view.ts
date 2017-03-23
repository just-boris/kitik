import m = require("mithril/hyperscript");
import UIComponent, {UIComponentConstructor} from "./component";
import {ComponentElement} from "./interfaces";
import Component = Mithril.Component;
import Vnode = Mithril.Vnode;
import VnodeDOM = Mithril.VnodeDOM;

interface StateShape {
    component: UIComponent;
}

interface AttrsShape {
    Component: UIComponentConstructor;
    originalAttrs: Object;
}

export function instantiateComponent(node: Element, Component: UIComponentConstructor, children): UIComponent {
    const component = new Component();
    component.node = node;
    component.helper = {
        region() {
            return children;
        },
    };
    (node as ComponentElement).kComponent = component;
    component.update();
    return component;
}

const MithrilView: Component<AttrsShape, StateShape> = {
    oncreate(vnode: VnodeDOM<AttrsShape, StateShape>) {
        const {Component} = vnode.attrs;
        vnode.state.component = instantiateComponent(vnode.dom, Component, vnode.children);
    },

    view(vnode: VnodeDOM<AttrsShape, StateShape>): Vnode<any, any> {
        const {Component, originalAttrs} = vnode.attrs;
        return m(Component.displayName, originalAttrs);
    },
};

export default MithrilView;
