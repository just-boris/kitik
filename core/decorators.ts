import * as Kitik from "./index";
import WeakMap = require("core-js/library/es6/weak-map");

export function property(target: Kitik.UIComponent, key: string): void {
    const metadata = new WeakMap();
    Object.defineProperty(target, key, {
        set(value) {
            const isInitial = !metadata.has(this);
            metadata.set(this, value);
            if (!isInitial) {
                this.update();
            }
        },
        get() {
            return metadata.get(this);
        },
    });
}
