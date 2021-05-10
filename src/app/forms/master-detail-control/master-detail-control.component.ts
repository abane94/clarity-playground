import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { GenericControlProvider, GenericControlValueAccessor } from '../GenericControlValueAccessor';
import { FormFieldDefinition, FormFieldDefinitionBase } from '../user-defined-form-viewer/user-defined-form-viewer.component';

@Component({
  selector: 'app-master-detail-control',
  templateUrl: './master-detail-control.component.html',
  styleUrls: ['./master-detail-control.component.scss'],
  providers: [GenericControlProvider(MasterDetailControlComponent)]
})
export class MasterDetailControlComponent extends GenericControlValueAccessor<any> implements OnInit {
  // items: string[] = [
  //   'what is your name?',
  //   'what is you age?'
  // ];
  form: FormGroup;
  itemsArray: FormArray;

  @Input()
  innerForm?: {key: string, fields: FormFieldDefinition[]};
  // = {
  //   key: 'MyForm',
  //   fields: [
  //     {
  //       type: 'SELECT',
  //       key: 'type',
  //       label: 'Field Type',
  //       multiple: false,
  //       // default,
  //       options: {
  //         type: 'PLAINTEXT',  // TODO: other could be possible, like loading from db somehow
  //         options: [
  //           {
  //             value: 'TEXT',
  //             display: 'TEXT',
  //             default: true,
  //           },
  //           {
  //             value: 'NUMBER',
  //             display: 'NUMBER',
  //           },
  //           {
  //             value: 'CHECK',
  //             display: 'CHECK',
  //           },
  //           // {
  //           //   value: 'DATE',
  //           //   display: 'DATE',
  //           // },
  //           {
  //             value: 'SELECT',
  //             display: 'SELECT',
  //           }
  //         ]
  //       },
  //       required: true
  //     },
  //     {
  //       type: 'TEXT',
  //       key: 'key',
  //       label: 'Field Key',
  //       placeholder: 'Field Key',
  //       required: true
  //     },
  //     {
  //       type: 'TEXT',
  //       key: 'label',
  //       label: 'Field Label',
  //       placeholder: 'Field Label',
  //       required: true
  //     },
  //     {
  //       type: 'TEXT',
  //       key: 'placeholder',
  //       label: 'Placeholder',
  //       placeholder: 'Placeholder',
  //       required: true
  //     },
  //     {
  //       type: 'CHECK',
  //       key: 'required',
  //       label: 'Required',
  //       default: false
  //     },
  //     // {
  //     //   key: "test",
  //     //   label: "Test",
  //     //   placeholder: "Enter Test here",
  //     //   required: true,
  //     //   type: "TEXT"
  //     // }
  //   ]
  // };

  i: FormFieldDefinition[] = [];
  constructor(private fb: FormBuilder) {
    super();

    this.itemsArray = this.fb.array([]);
    this.form = this.fb.group({items: this.itemsArray});

  }
  ngOnInit(): void {
    // this.fb.array( [this.createItem()] );
    // this.fb.group({items: this.itemsArray});
    this.add();

    // this.itemsArray = this.fb.array([]);
    // this.form = this.fb.group({items: this.itemsArray});
    this.itemsArray.valueChanges.subscribe(value => {
      if (this._changeHandler) {
        this._changeHandler(this.itemsArray?.value);
      }
    });
  }

  get value(): any {
    // throw new Error('Method not implemented.');
    return this.itemsArray?.value;
  }
  set value(v: any) {
    // throw new Error('Method not implemented.');
    this.itemsArray?.setValue(v);
  }

  writeValue(obj: any): void {
      if (!this.initialSet) {
          this.initial = obj;
          this.initialSet = true
      }
      if (obj === null) {
          // angular will write null during reset if no arguments are given
          // this.val = this.initial,
          this.itemsArray?.setValue(this.initial);
          this._changeHandler(this.val);
      } else {
          this.value = obj;
      }
  }

  _setDisabledState(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  get itemControls() {
    return this.itemsArray?.controls as FormGroup[]
  }

  createItem() {
    if (!this.innerForm) {
      console.warn('No Inner form');
      return;
    }
    const controlObj: Record<string,any> = {};
    for (const fieldDef of this.innerForm.fields) {
      controlObj[fieldDef.key] = '';   // TODO: find away to get the initial value from the data some how   (this.form.controls.items as FormArray).value ...
    }

    return this.fb.control({
      type: 'TEXT',
      // key: ['', Validators.required],  // validators cannot be set here, because this is a single control not a group, and it needs to be that way
      // label: ['', Validators.required],
      key: '',
      label: '',
      placeholder: '',
      required: false,
    }, [this.createValidator('key')]);
  }

  createRequiredValidator(v: any, fieldDef: FormFieldDefinition) {
    return () => {
      if (!v && fieldDef.type === 'CHECK') {
        return {required: fieldDef.label + ' is Required'}
      }
      return null
    }
  }

  createValidator(subfield: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (typeof control?.value === 'object' && control.value.hasOwnProperty(subfield)) {
          const subValue = control.value[subfield];
          return (subValue && typeof subValue === 'string' && subValue.toLowerCase() === 'blue')
            ? null : {[`${subfield}>wrongColor`]: subValue};
      }
      return { [`${subfield}>ValidatorError`]: 'No Field. This is an error in the code of the input validator.'}
    }
}

  print() {
    console.log(JSON.stringify(this.form?.value))
  }

  add() {
    const newControl = this.createItem();
    if (newControl) {
      this.itemsArray?.push(newControl);
    }
  }

  alertErrors(item: AbstractControl) {
    const invalid: Record<string, any> = {};
    const controls = (item as FormGroup).controls;
    if (controls) {
      for (const name in controls) {
          if (controls[name].invalid) {
              invalid[name] = controls[name].errors;
          }
      }
    }

    alert(`${item.valid} - ${item.invalid} - ${JSON.stringify(item.errors)} - ${JSON.stringify(invalid, undefined, 2)}`);

  }

}
