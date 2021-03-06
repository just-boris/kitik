import {Component, Vnode, VnodeDOM} from "mithril";
import m = require("mithril/hyperscript");
import UIComponent, {UIComponentConstructor} from "./component";
import {RegionsMap} from "./interfaces";

interface StateShape {
    component: UIComponent;
}

interface AttrsShape {
    Component: UIComponentConstructor;
    originalAttrs: Object;
}

export function instantiateComponent(
    node: Element,
    Component: UIComponentConstructor,
    regions: RegionsMap,
): UIComponent {
    const component = new Component(node, regions);
    component.update();
    return component;
}

const MithrilView: Component<AttrsShape, StateShape> = {
    oncreate(vnode: VnodeDOM<AttrsShape, StateShape>) {
        const {Component} = vnode.attrs;
        vnode.state.component = instantiateComponent(vnode.dom, Component, {default: vnode.children});
    },

    view(vnode: VnodeDOM<AttrsShape, StateShape>): Vnode<any, any> {
        const {Component, originalAttrs} = vnode.attrs;
        return m(Component.displayName, originalAttrs);
    },
};

export default MithrilView;
