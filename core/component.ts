import renderer = require("mithril/render");
import {RegionsMap, ChildNodes, ComponentElement} from "./interfaces";
import ComponentEvent from "./event";

abstract class UIComponent {
    protected node: ComponentElement;
    protected regions: RegionsMap;

    constructor(node, regions) {
        this.node = node;
        node.kComponent = this;
        this.regions = regions;
    }

    public update(): void {
        renderer.render(this.node, this.render());
    }

    protected fireEvent(event: ComponentEvent<any>) {
        this.node.dispatchEvent(event);
    }

    protected getRegion(name): ChildNodes {
        return this.regions[name];
    }

    protected abstract render(): ChildNodes;
}

export interface UIComponentConstructor {
    displayName?: string;
    new (node: Element, regions: RegionsMap): UIComponent;
}

export default UIComponent;
