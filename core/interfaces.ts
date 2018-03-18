import Mithril = require("mithril");
import UIComponent from "./component";

export interface ComponentElement extends Element {
    kComponent: UIComponent;
}

export type ChildNodes = Mithril.Children;

export interface RegionsMap {
    [key: string]: ChildNodes;
}
