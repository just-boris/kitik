import * as Kitik from "../../core";
import {ChildNodes} from "../../core/interfaces";

/**
 * Expandable panel. Allows to open and collapse content via clicking on the title
 */
@Kitik.createComponent("k-expandable")
export default class ExpandablePanel extends Kitik.UIComponent {
    /**
     * Property, describing whether panel is open or not
     */
    @Kitik.property
    public isOpen: boolean = false;

    @Kitik.region("title")
    private readonly title: ChildNodes;

    @Kitik.region("body", {isDefault: true})
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
