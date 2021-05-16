import { Component, forwardRef, HostBinding, Injectable, Input } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';


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





/*

writeValue(value: ConditionFormComponentData): void {
    if (!value) {
      return;
    }

    this._form.patchValue(value);
  }



*/



import { EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Injectable()
export abstract class GenericControlValueAccessorV2<T> implements ControlValueAccessor, OnDestroy, OnInit {
    @Input()
    formLabel: string | number = "Group";
    @Output()
    remove: EventEmitter<void> = new EventEmitter<void>();

    _form!: FormGroup;

    protected _onChange: ((value: T | null | undefined) => void) | undefined;
    protected _onTouch: ((value: T | null | undefined) => void) | undefined;

    private _destroy$: Subject<void> = new Subject<void>();
    protected disabled = false;

    constructor(protected _fb: FormBuilder) {}

    ngOnInit() {
      this._createFormGroup();

      this._setupObservables();
    }

    ngOnDestroy() {
      if (this._destroy$ && !this._destroy$.closed) {
        this._destroy$.next();
        this._destroy$.complete();
      }
    }

    writeValue(value: T | null | undefined): void {  // the input here is a union, the other is not
      if (!value) {
        return;
      }

      this._form.patchValue(value);
    }

    registerOnChange(fn: (value: T | null | undefined) => void): void {
      this._onChange = fn;
    }

    registerOnTouched(fn: (value: T | null | undefined) => void): void {
      this._onTouch = fn;
    }

    setDisabledState(isDisabled: boolean): void {
      this.disabled = isDisabled;
    }

    abstract _createFormGroup(): void;
    // {
    //   this._form = this._fb.group({
    //     conjunctor: null,
    //     conditions: this._fb.array([]),
    //     groups: this._fb.array([])
    //   });

    //   // add one condition on the next tick, after the form creation   // ARIS: this is different and seems to be important to angular timing
    //   setTimeout(() => this._addCondition());
    // }

    private _setupObservables() {
      this._form.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(value => {
        if (this._onChange) {
          this._onChange(value);
        }
      });
    }
}
