import * as Kitik from "../../core";
import {ChildNodes} from "../../core/interfaces";

@Kitik.createComponent("k-button")
export default class Button extends Kitik.UIComponent {

    @Kitik.region("body", {isDefault: true})
    private body: ChildNodes;

    protected render(): ChildNodes {
        const type = this.node.getAttribute("type") || "button";
        return <button type={type} onclick={this.onButtonClick}>{this.body}</button>;
    }

    private onButtonClick = (event: Event) => {
        event.stopPropagation();
        this.node.dispatchEvent(new CustomEvent("click"));
    }
}
