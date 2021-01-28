import { Component, forwardRef, HostBinding, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// todo: creata general typers file for easy reuse
type Class = new(...args: any[]) => any;

export const GenericControlProvider = (cls: Class) => ({
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => cls),
    multi: true
})


export abstract class GenericControlValueAccessor<T> implements ControlValueAccessor {
    public val: T | undefined;
    protected changeHandler: Function | undefined;
    protected touchHandler: Function | undefined;

    protected initial: T | undefined;
    protected initialSet = false;
    protected lastValue: T | undefined;

    abstract get value(): T;
    abstract set value(v: T);

    abstract _setDisabledState(isDisabled: boolean): void;

    protected _changeHandler(v: T | undefined) {
        if (v !== this.lastValue) {
            this.lastValue = v;
            if (this.changeHandler) {
                this.changeHandler(v);
            }
        }
    }

    writeValue(obj: any): void {
        if (!this.initialSet) {
            this.initial = obj;
            this.initialSet = true
        }
        if (obj === null) {
            // angular will write null during reset if no arguments are given
            this.val = this.initial,
            this._changeHandler(this.val);
        } else {
            this.value = obj;
        }
    }
    registerOnChange(fn: Function) {
        if (typeof fn === 'function') {
            this.changeHandler = fn;
        }
    }

    registerOnTouched(fn: Function) {
        if (typeof fn === 'function') {
            this.touchHandler = fn;
        }
    }

    setDisabledState(isDisabled: boolean): void {
        this._setDisabledState(isDisabled);
    }
}
