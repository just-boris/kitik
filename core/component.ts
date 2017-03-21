import renderer = require("mithril/render");
import {HelperApi} from "./interfaces";

abstract class UIComponent {
    public node: Element;
    public helper: HelperApi;

    public update(): void {
        renderer.render(this.node, this.render());
    }

    protected abstract render(): Mithril.Children;
}

export interface UIComponentConstructor {
    displayName: string;
    new (): UIComponent;
}

export default UIComponent;
