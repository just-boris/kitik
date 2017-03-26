import renderer = require("mithril/render");
import {HelperApi} from "./interfaces";

abstract class UIComponent {
    protected node: Element;
    protected helper: HelperApi;

    constructor(node, helper) {
        this.node = node;
        this.helper = helper;
    }

    public update(): void {
        renderer.render(this.node, this.render());
    }

    protected abstract render(): Mithril.Children;
}

export interface UIComponentConstructor {
    displayName: string;
    new (node: Element, helper: HelperApi): UIComponent;
}

export default UIComponent;
