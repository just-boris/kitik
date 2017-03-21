import * as Kitik from "../../core";
import {property} from "../../core/decorators";

@Kitik.createComponent("k-expandable")
export default class ExpandablePanel extends Kitik.UIComponent {
    @property
    public isOpen: boolean = false;

    protected render(): Mithril.Children {
        const title = this.node.getAttribute("title");
        return <div className="k-expandable">
            <h3 className="k-expandable__title" onclick={this.onTitleClick}>{title}</h3>
            {this.isOpen && <div className="k-expandable__text">
                {this.helper.region()}
            </div>}
        </div>;
    }

    private onTitleClick = () => {
        this.isOpen = !this.isOpen;
    }
}
