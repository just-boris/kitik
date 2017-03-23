import UIComponent from "./component";

export interface ComponentElement extends Element {
    kComponent: UIComponent;
}

export interface HelperApi {
    region(): Mithril.Children;
}
