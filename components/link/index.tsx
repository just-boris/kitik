import * as Kitik from "../../core";

@Kitik.createComponent("k-link")
class Link extends Kitik.UIComponent {
    protected render(): Mithril.Children {
        return <a href={this.node.getAttribute("href")}>{this.helper.region()}</a>;
    }
}
