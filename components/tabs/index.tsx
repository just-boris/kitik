import "./styles.scss";
import * as Kitik from "../../core";
import {ChildNodes} from "../../core/interfaces";
import "./tab";

interface TabConfig {
    title: ChildNodes;
    content: ChildNodes;
}

interface TabSelectDetail {
    tabIndex: number;
    config: TabConfig;
}

export class TabSelectEvent extends Kitik.ComponentEvent<TabSelectDetail> {
    constructor(tabIndex, config) {
        super("tabSelect", {tabIndex, config});
    }
}

function TabItem({tab, onclick, selectedTab}) {
    let className = "k-tabs__item";
    if (tab === selectedTab) {
        className += " k-tabs__item_active";
    }
    return <li className={className} onclick={onclick}>{tab.title}</li>;
}

@Kitik.createComponent("k-tabs")
export default class Tabs extends Kitik.UIComponent {
    private tabs: TabConfig[] = [];

    private selectedTab: TabConfig;

    constructor(node, regions) {
        super(node, regions);
        Array.prototype.slice.call(node.querySelectorAll("k-tab")).forEach(tab => {
            Kitik.activateNode(tab);
        });
    }

    public addTab(title: ChildNodes, content: ChildNodes) {
        this.tabs.push({title, content});
        if (this.tabs.length === 1) {
            this.selectedTab = this.tabs[0];
        }
    }

    protected render(): ChildNodes {
        return <div>
            <ul className="k-tabs__tabs">
                {this.tabs.map(tab => TabItem({
                    onclick: () => this.selectTab(tab),
                    selectedTab: this.selectedTab,
                    tab,
                }))}
            </ul>
            <div>{this.selectedTab.content}</div>
        </div>;
    }

    private selectTab(tab: TabConfig) {
        this.selectedTab = tab;
        this.fireEvent(new TabSelectEvent(this.tabs.indexOf(tab), tab));
        this.update();
    }
}
