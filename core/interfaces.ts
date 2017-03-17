export interface VNode extends Mithril.VirtualElement {
    dom: HTMLElement;
}

export interface HelperApi {
    region() : VNode;
}
