import * as Kitik from "../../core";
import {property, region} from "../../core/decorators";
import {ChildNodes} from "../../core/interfaces";

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

    @region("title")
    private readonly title: ChildNodes;

    @region("body", {isDefault: true})
    private readonly body: ChildNodes;

    protected render(): ChildNodes {
        return <div className="k-expandable">
            <h3 className="k-expandable__title" onclick={this.onTitleClick}>{this.title}</h3>
            {this.isOpen && <div className="k-expandable__text">
                {this.body}
            </div>}
        </div>;
    }

    private onTitleClick = () => {
        this.isOpen = !this.isOpen;
    }
}
