import * as Kitik from '../../core';

class Link extends Kitik.UIComponent {
    render(): Mithril.Children {
        return <a href={this.node.getAttribute('href')}>{this.helper.region()}</a>;
    }
}

Kitik.createComponent('k-link', Link);
