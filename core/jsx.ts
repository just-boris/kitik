import m = require("mithril/hyperscript");
import {UIComponentConstructor} from "./component";
import {ChildNodes} from "./interfaces";
import MithrilView from "./mithrill-view";

export default function jsx(Selector: string | UIComponentConstructor, attributes: Object, ...children: ChildNodes[]) {
    if (typeof Selector === "function") {
        return m(MithrilView, {Component: Selector, originalAttrs: attributes}, ...children);
    } else {
        return m(Selector, attributes, children);
    }
}
