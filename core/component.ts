import renderer = require("mithril/render");
import {RegionsMap, ChildNodes} from "./interfaces";

abstract class UIComponent {
    protected node: Element;
    protected regions: RegionsMap;

    constructor(node, regions) {
        this.node = node;
        this.regions = regions;
    }

    public update(): void {
        renderer.render(this.node, this.render());
    }

    protected getRegion(name): ChildNodes {
        return this.regions[name];
    }

    protected abstract render(): ChildNodes;
}

export interface UIComponentConstructor {
    displayName: string;
    new (node: Element, regions: RegionsMap): UIComponent;
}

export default UIComponent;
