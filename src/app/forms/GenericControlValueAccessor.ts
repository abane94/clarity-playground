import { Component, forwardRef, HostBinding, Injectable, Input, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR, FormBuilder } from '@angular/forms';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";


// todo: creata general typers file for easy reuse
type Class = new(...args: any[]) => any;

export const GenericControlProvider = (cls: Class) => ({
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => cls),
    multi: true
})


@Injectable()
export abstract class GenericControlValueAccessor<T> implements ControlValueAccessor, OnDestroy, OnInit {
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

    writeValue(value: T | null | undefined): void {
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

    private _setupObservables() {
      this._form.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(value => {
        if (this._onChange) {
          this._onChange(value);
        }
      });
    }
}
