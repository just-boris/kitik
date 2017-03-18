import * as Kitik from "./index";

export function property(target: Kitik.UIComponent, key: string): void {
    let value = target[key];
    let skipInitial = !target.hasOwnProperty(key);
    Object.defineProperty(target, key, {
        set(val) {
            if (skipInitial) {
                skipInitial = false;
            } else {
                value = val;
                this.update();
            }
        },
        get() {
            return value;
        },
    });
}
