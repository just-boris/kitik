import m = require("mithril/hyperscript");
import UIComponent, {UIComponentConstructor} from "./component";
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

const MithrilView: Component<AttrsShape, StateShape> = {
    oncreate(vnode: VnodeDOM<AttrsShape, StateShape>) {
        const {Component} = vnode.attrs;
        const component = new Component();
        component.node = vnode.dom;
        component.helper = {
            region() {
                return vnode.children;
            },
        };
        vnode.state.component = component;
        component.update();
    },

    view(vnode: VnodeDOM<AttrsShape, StateShape>): Vnode<any, any> {
        const {Component, originalAttrs} = vnode.attrs;
        return m(Component.displayName, originalAttrs);
    },
};

export default MithrilView;
