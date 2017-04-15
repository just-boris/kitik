export default class ComponentEvent<T> implements CustomEvent {
    public detail: T;
    public bubbles: boolean;
    public cancelBubble: boolean;
    public cancelable: boolean;
    public currentTarget: EventTarget;
    public defaultPrevented: boolean;
    public eventPhase: number;
    public isTrusted: boolean;
    public returnValue: boolean;
    public srcElement: Element | any;
    public target: EventTarget;
    public timeStamp: number;
    public type: string;
    public scoped: boolean;
    public AT_TARGET: number;
    public BUBBLING_PHASE: number;
    public CAPTURING_PHASE: number;

    constructor(name: string, detail: T) {
        return new CustomEvent(name, {detail});
    }

    public initCustomEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, detailArg: any): void {
        // noop
    }

    public initEvent(eventTypeArg: string, canBubbleArg: boolean, cancelableArg: boolean): void {
        // noop
    }

    public preventDefault(): void {
        // noop
    }

    public stopImmediatePropagation(): void {
        // noop
    }

    public stopPropagation(): void {
        // noop
    }

    public deepPath(): EventTarget[] {
        return null;
    }
};
