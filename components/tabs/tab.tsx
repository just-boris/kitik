import * as Kitik from "../../core";
import {ChildNodes} from "../../core/interfaces";

@Kitik.createComponent("k-tab")
export default class Tab extends Kitik.UIComponent {
    private get title(): ChildNodes {
        return this.node.getAttribute("title");
    }

    @Kitik.region("content", {isDefault: true})
    private content: ChildNodes;

    constructor(node, regions) {
        super(node, regions);
        node.parentElement.kComponent.addTab(this.title, this.content);
    }
    protected render(): ChildNodes {
        return null;
    }
}
