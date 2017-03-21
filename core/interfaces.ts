import UIComponent from "./component";

export interface VNode extends Mithril.VirtualElement {
    dom: HTMLElement;
}

export interface ComponentElement extends HTMLElement {
    kComponent: UIComponent;
}

export interface HelperApi {
    region(): VNode;
}
