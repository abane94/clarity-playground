import { Component, ContentChild, ContentChildren, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
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
  @ContentChild(TemplateRef) templateRef!: TemplateRef<any>;

  itemsArray: FormArray;

  @Input()
  innerForm!: FormDefinition;

  i: FormFieldDefinition[] = [];

  constructor(_fb: FormBuilder) {
    super(_fb);

    this.itemsArray = _fb.array([]);
    this._form = _fb.group({items: this.itemsArray});

  }

  _createFormGroup() {
    // TODO: this has to wait to be called until inputs are available
    this.itemsArray = this._fb.array([]);
    this._form = this._fb.group({items: this.itemsArray});

    // add one item on the next tick, after the form creation
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

  objectKeys(o: object) {
    return Object.keys(o || {});
  }

}
