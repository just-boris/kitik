import renderer = require("mithril/render");
import {HelperApi} from "./interfaces";

abstract class UIComponent {
    public node: HTMLElement;
    public helper: HelperApi;

    public update(): void {
        renderer.render(this.node, this.render());
    }

    protected abstract render(): Mithril.Children;
}

export default UIComponent;
