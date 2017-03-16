import * as Kitik from '../../core';

class Link extends Kitik.UIComponent {
    render(helper: any): Mithril.Children {
        return <a href={this.node.getAttribute('href')}>{helper.region()}</a>;
    }
}

Kitik.createComponent('k-link', Link);
