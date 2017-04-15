import {TabSelectEvent} from "../components/tabs";
import ExpandablePanel from "../components/expandable-panel";
import {ComponentElement} from "../core/interfaces";
import * as Kitik from "../core";
// import module with side-effects
// https://github.com/Microsoft/TypeScript/wiki/FAQ#why-are-imports-being-elided-in-my-emit
import "../components";

Kitik.activate();

function qs(selector: string): ComponentElement {
    return document.querySelector(selector) as ComponentElement;
}

qs("#expand-panel").addEventListener("click", () => {
    (qs("k-expandable").kComponent as ExpandablePanel).isOpen = true;
});

qs("#open-modal").addEventListener("click", () => {
    const element = document.createElement("k-modal");
    element.setAttribute("title", "Modal title");
    element.innerHTML = `<p>My modal content<p><p>Supports <a href="">Html</a></p>`;
    document.body.appendChild(element);
    Kitik.activateNode(element);
});

qs("k-tabs").addEventListener("tabSelect", (event: TabSelectEvent) => {
   console.log(event.detail.tabIndex, event.detail.config);
});
