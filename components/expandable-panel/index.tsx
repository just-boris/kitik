import * as Kitik from '../../core';

class ExpandablePanel extends Kitik.UIComponent {
    isOpen: boolean = false;

    onTitleClick = () => {
        this.isOpen = true;
    };

    render(helper: any): Mithril.Children {
        const title = this.node.getAttribute('title');
        return <div className="k-expandable">
            <h2 className="k-expandable__title" onclick={this.onTitleClick}>{title}</h2>
            {this.isOpen && <div className="k-expandable__text">
                {helper.region()}
            </div>}
        </div>
    }
}

Kitik.createComponent('k-expandable', ExpandablePanel);
