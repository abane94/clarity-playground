import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericControlProvider, GenericControlValueAccessor } from '../GenericControlValueAccessor';
import { NamedTemplateDirective } from '../named-template/named-template.directive';

/**
 * TODO:
 *    add hidden field type for static data
 *    add a way to do conditional logic, maybe just something simple like { fieldname: value }, the if that is true, the field is shown
 *    add a regex field that is optional, angular material supports this (?) so maybe clarity will also?
 */

// helper methods to cast the fields in the template
export const castOptionsField = (f: FormFieldDefinition) => (f as MultiFormFieldDefinition);
export const castNestedField = (f: FormFieldDefinition) => (f as NestedFormFieldDefinition);

export interface FormFieldDefinitionBase<T> {
  type: 'TEXT' | 'NUMBER' | 'CHECK' | 'RADIO' | 'TOGGLE' |'DATE' | 'AUTOCOMPLETE' /** Combo? */ | 'SELECT' | 'RANGE' | 'TEXTAREA' | 'NESTED';  // TODO could have phone and email options, or those could be validators. HTML might have input types of these...
  key: string;
  label: string;
  placeholder?: string;
  default?: T;
  required?: boolean;
  // validators: any; // TODO: define valadators that a user can pick from a multi select

}

interface TextFormFieldDefinition extends FormFieldDefinitionBase<string> {
  type: 'TEXT' | 'TEXTAREA';
}

interface DateFormFieldDefinition extends FormFieldDefinitionBase<Date> {
  type: 'DATE';
}

interface NumberFormFieldDefinition extends FormFieldDefinitionBase<number> {
  type: 'NUMBER';
  step?: number;
  // min and max can be done with validators
}

interface BoolFormFieldDefinition extends FormFieldDefinitionBase<boolean> {
  type: 'CHECK' | 'TOGGLE'
  // TODO: will this work, using the same interface, because there might not be a reason to seperate
  // TODO: alternative the one reason to seperate could be tri-state fields, but that might still be achievable with the same interface
  // TODO: Update: toggle might be for binary options that are not on/off / yes/no types of things
}

interface NestedFormFieldDefinition extends FormFieldDefinitionBase<any> {
  type: 'NESTED',
  innerForm: {key: string, fields: FormFieldDefinition[]};
}

interface OptionDefinition {
  value: string;
  display: string;
  default?: true;
}

interface OptionsSource {
  type: 'PLAINTEXT';  // TODO: other could be possible, like loading from db somehow
  options: OptionDefinition[];
}

interface MultiFormFieldDefinition {
  type: 'RADIO' | 'AUTOCOMPLETE' | 'SELECT';
  // TODO: clarity differentiates SELECT and COMBOBOXES where COMBOBOXES are used for filtering autocomplete data-backing options. SELECTS are simple
  required?: boolean;  // this is required here to use this property on the generic FormFieldDefinition
  key: string;
  label: string;
  options: OptionsSource;
  multiple: boolean;  // TODO check to see which components this is possible on, and the editor will have to make sure it checks out
}


export type FormFieldDefinition = TextFormFieldDefinition | NumberFormFieldDefinition | BoolFormFieldDefinition | MultiFormFieldDefinition | DateFormFieldDefinition | NestedFormFieldDefinition;

export interface FormDefinition {
  key: string;
  fields: FormFieldDefinition[];  // this should be a list with a key property instead of {key: FieldDef}, so that the ordering of the fields is consistent
}

@Component({
  selector: 'app-user-defined-form-viewer',
  templateUrl: './user-defined-form-viewer.component.html',
  styleUrls: ['./user-defined-form-viewer.component.scss'],
  providers: [GenericControlProvider(UserDefinedFormViewerComponent)]
})
export class UserDefinedFormViewerComponent extends GenericControlValueAccessor<any> implements OnInit {

  @Input()
  public formDef!: FormDefinition;

  @Input() templates: NamedTemplateDirective[] = [];

  newDate = () => new Date()

  // public form: FormGroup;

  get Errors() {
    const ret: Record<string, any> = {
      form: this._form.errors
    };
    for (const c of Object.keys(this._form.controls || {})) {
      ret[c] = this._form.controls[c].errors;
    }
    return ret || '';
  }

  get value(): any {
    return this._form.value;
  }
  set value(v: any) {
    console.log(this);
    this._form.setValue(v);
    console.log('After set');
  }


  // helper methods to cast the fields in the template
  castOptionsField = castOptionsField;
  castNestedField = castNestedField;

  constructor(_fb: FormBuilder) {
    super(_fb);
  }


  _createFormGroup() {

    const formObj = UserDefinedFormViewerComponent.buildFormObject(this.formDef);
    this._form = this._fb.group(formObj);
  }

  printValue() {
    console.log(this._form?.value);
  }

  static buildFormObject(innerForm: FormDefinition) {

    const defaultItem: Record<string, any> = {};

    for (const formDef of innerForm.fields) {
        switch(formDef.type) {
        case('TEXT'):
        case('TEXTAREA'):
            defaultItem[formDef.key] = formDef.default || '';
            break;
        case('NUMBER'):
            defaultItem[formDef.key] = formDef.default || 0;
            break;
        case('CHECK'):
        case('TOGGLE'):
            defaultItem[formDef.key] = formDef.default || false;
            break;
        case('RADIO'):
        case('AUTOCOMPLETE'):
        case('SELECT'):
            const val = formDef.options.options.find(o => o.default);
            defaultItem[formDef.key] = val?.value || '';
            break;
        case('DATE'):
            defaultItem[formDef.key] = formDef.default || new Date();
            break;
        case('NESTED'):
            defaultItem[formDef.key] = formDef.default || UserDefinedFormViewerComponent.buildFormObject(formDef.innerForm);
            break;
        }
    }

      return defaultItem;
  }

}
