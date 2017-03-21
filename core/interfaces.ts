import UIComponent from "./component";

export interface ComponentElement extends HTMLElement {
    kComponent: UIComponent;
}

export interface HelperApi {
    region(): Mithril.Children;
}
