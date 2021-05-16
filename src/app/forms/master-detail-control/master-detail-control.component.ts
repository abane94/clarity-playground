import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { GenericControlProvider, GenericControlValueAccessor } from '../GenericControlValueAccessor';
import { FormDefinition, FormFieldDefinition, FormFieldDefinitionBase, UserDefinedFormViewerComponent } from '../user-defined-form-viewer/user-defined-form-viewer.component';

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
  // form: FormGroup;
  itemsArray: FormArray;

  @Input()
  innerForm!: FormDefinition;

  i: FormFieldDefinition[] = [];

  constructor(_fb: FormBuilder) {
    super(_fb);

    this.itemsArray = _fb.array([]);
    this._form = _fb.group({items: this.itemsArray});

  }
//   ngOnInit(): void {
//     // this.fb.array( [this.createItem()] );
//     // this.fb.group({items: this.itemsArray});
//     this.add();

//     // this.itemsArray = this.fb.array([]);
//     // this.form = this.fb.group({items: this.itemsArray});
//     this.itemsArray.valueChanges.subscribe(value => {
//       if (this._changeHandler) {
//         this._changeHandler(this.itemsArray?.value);
//       }
//     });
//   }

//   get value(): any {
//     // throw new Error('Method not implemented.');
//     return this.itemsArray?.value;
//   }
//   set value(v: any) {
//     // throw new Error('Method not implemented.');
//     this.itemsArray?.setValue(v);
//   }

//   writeValue(obj: any): void {
//       if (!this.initialSet) {
//           this.initial = obj;
//           this.initialSet = true
//       }
//       if (obj === null) {
//           // angular will write null during reset if no arguments are given
//           // this.val = this.initial,
//           this.itemsArray?.setValue(this.initial);
//           this._changeHandler(this.val);
//       } else {
//           this.value = obj;
//       }
//   }

//   _setDisabledState(isDisabled: boolean): void {
//     throw new Error('Method not implemented.');
//   }

  _createFormGroup() {
    // TODO: this has to wait to be called until inputs are available

    // this._form = this._fb.group({
    //   conjunctor: null,
    //   conditions: this._fb.array([]),
    //   groups: this._fb.array([])
    // });


    this.itemsArray = this._fb.array([]);
    this._form = this._fb.group({items: this.itemsArray});

    // add one condition on the next tick, after the form creation   // ARIS: this is different and seems to be important to angular timing
    setTimeout(() => this.add());
  }

  get itemControls() {
    return this.itemsArray?.controls as FormGroup[]
  }

  createItem() {
    if (!this.innerForm) {
      console.warn('No Inner form');
      return;
    }
    // const controlObj: Record<string,any> = {};
    // for (const fieldDef of this.innerForm.fields) {
    //   controlObj[fieldDef.key] = '';   // TODO: find away to get the initial value from the data some how   (this.form.controls.items as FormArray).value ...
    // }

    const itemFormDef = UserDefinedFormViewerComponent.buildFormObject(this.innerForm);
    return this._fb.control(itemFormDef, [this.createValidator('key')]);
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
    console.log(JSON.stringify(this._form?.value))
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
