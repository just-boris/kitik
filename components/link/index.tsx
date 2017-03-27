import * as Kitik from "../../core";
import {region} from "../../core/decorators";
import {ChildNodes} from "../../core/interfaces";

@Kitik.createComponent("k-link")
export default class Link extends Kitik.UIComponent {

    @region("body", {isDefault: true})
    private body: ChildNodes;

    protected render(): ChildNodes {
        return <a href={this.node.getAttribute("href")}>{this.body}</a>;
    }
}
