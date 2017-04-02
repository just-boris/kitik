import "./styles.scss";
import * as Kitik from "../../core";
import {ChildNodes} from "../../core/interfaces";
import Button from "../button";

@Kitik.createComponent("k-modal")
export default class Modal extends Kitik.UIComponent {
    @Kitik.property
    private isOpen: boolean = true;

    @Kitik.region("default")
    private body: ChildNodes;

    protected render(): Mithril.Children {
        const title = this.node.getAttribute("title");
        return <div className="k-modal" hidden={!this.isOpen}>
            <div className="k-modal__window">
                <Button type="button" className="k-modal__close" onclick={this.onCloseClick}>&times;</Button>
                <h3 className="k-modal__title">{title}</h3>
                <div className="k-modal__body">{this.body}</div>
            </div>
        </div>;
    }

    private onCloseClick = () => {
        this.isOpen = false;
        this.node.dispatchEvent(new CustomEvent("modal:close"));
    }
}
