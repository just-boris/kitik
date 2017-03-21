import "./styles.scss";
import * as Kitik from "../../core";
import {property} from "../../core/decorators";

@Kitik.createComponent("k-modal")
export default class Modal extends Kitik.UIComponent {
    @property
    private isOpen: boolean = true;

    protected render(): Mithril.Children {
        const title = this.node.getAttribute("title");
        return <div className="k-modal" hidden={!this.isOpen}>
            <div className="k-modal__window">
                <button type="button" className="k-modal__close" onclick={this.onCloseClick}>&times;</button>
                <h3 className="k-modal__title">{title}</h3>
                <div className="k-modal__body">{this.helper.region()}</div>
            </div>
        </div>;
    }

    private onCloseClick = () => {
        this.isOpen = false;
        this.node.dispatchEvent(new CustomEvent("modal:close"));
    }
}
