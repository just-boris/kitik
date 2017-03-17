import renderer = require('mithril/render');
import {HelperApi} from "./interfaces";

abstract class UIComponent {
    node: HTMLElement;
    helper: HelperApi;
    abstract render(): Mithril.Children;

    update() : void {
        renderer.render(this.node, this.render());
    }
}

export default UIComponent;
