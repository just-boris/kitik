import * as Kitik from "../../core";

@Kitik.createComponent("k-button")
export default class Button extends Kitik.UIComponent {

    protected render(): Mithril.Children {
        const type = this.node.getAttribute("type") || "button";
        return <button type={type} onclick={this.onButtonClick}>{this.helper.region()}</button>;
    }

    private onButtonClick = (event: Event) => {
        event.stopPropagation();
        this.node.dispatchEvent(new CustomEvent("click"));
    }
}
