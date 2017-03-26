import * as Kitik from "../../core";
import {property} from "../../core/decorators";

/**
 * Expandable panel. Allows to open and collapse content via clicking on the title
 */
@Kitik.createComponent("k-expandable")
export default class ExpandablePanel extends Kitik.UIComponent {
    /**
     * Property, describing whether panel is open or not
     */
    @property
    public isOpen: boolean = false;

    get title() {
        return this.node.getAttribute("title");
    }

    protected render(): Mithril.Children {
        return <div className="k-expandable">
            <h3 className="k-expandable__title" onclick={this.onTitleClick}>{this.title}</h3>
            {this.isOpen && <div className="k-expandable__text">
                {this.helper.region()}
            </div>}
        </div>;
    }

    private onTitleClick = () => {
        this.isOpen = !this.isOpen;
    }
}
