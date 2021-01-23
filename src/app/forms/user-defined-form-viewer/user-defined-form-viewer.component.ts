import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


export interface FormFieldDefinitionBase<T> {
  type: 'TEXT' | 'NUMBER' | 'CHECK' | 'RADIO' | 'TOGGLE' |'DATE' | 'AUTOCOMPLETE' /** Combo? */ | 'SELECT' | 'RANGE' | 'TEXTAREA';  // TODO could have phone and email options, or those could be validators. HTML might have input types of these...
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


export type FormFieldDefinition = TextFormFieldDefinition | NumberFormFieldDefinition | BoolFormFieldDefinition | MultiFormFieldDefinition | DateFormFieldDefinition;

interface FormDefinition {
  key: string;
  fields: FormFieldDefinition[];  // this should be a list with a key property instead of {key: FieldDef}, so that the ordering of the fields is consistent
}

@Component({
  selector: 'app-user-defined-form-viewer',
  templateUrl: './user-defined-form-viewer.component.html',
  styleUrls: ['./user-defined-form-viewer.component.scss']
})
export class UserDefinedFormViewerComponent implements OnInit {

  public formDef: FormDefinition = {
    key: 'MyForm',
    fields: [
      {
        type: 'TEXT',
        key: 'name',
        label: 'Name',
        placeholder: 'Name',
        // default
        required: true
      },
      {
        type: 'NUMBER',
        key: 'age',
        // allowDecimals: false,
        label: 'Age',
        // placeholder: 'Name',
        // default
        required: false
      },
      {
        type: 'CHECK',
        key: 'programer',
        label: 'Are you a programmer?',
        default: false
      }, {
        type: 'SELECT',
        key: 'language',
        label: 'What language do you program in?',
        multiple: false,
        options: {
          type: 'PLAINTEXT',
          options: [{
            display: 'Java',
            value: 'java'
          },{
            display: 'c++',
            value: 'cpp'
          },{
            display: 'Typescript',
            value: 'ts'
          }]
        }
      },
      {
        type: 'DATE',
        key: 'start',
        label: 'When did you start coding?',
      }
    ]
  };

  newDate = () => new Date()

  public form: FormGroup | undefined;

  // helper methods to cast the fields in the template
  castOptionsField = (f: FormFieldDefinition) => (f as MultiFormFieldDefinition)

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    const formObj: { [fieldKey: string]: any[]} = {}
    for (const fieldDef of this.formDef.fields) {
      switch(fieldDef.type) {
        case 'TEXT':
          formObj[fieldDef.key] = [fieldDef.default || ''];
          if (fieldDef.required) { formObj[fieldDef.key].push(Validators.required); }
          break;
        case 'NUMBER':
          formObj[fieldDef.key] = [fieldDef.default || 0]
          if (fieldDef.required) { formObj[fieldDef.key].push(Validators.required); }
          break;
        case 'CHECK':
          formObj[fieldDef.key] = [fieldDef.default || false];
          // if (fieldDef.required) { formObj[fieldDef.key].push(Validators.required); }  // TODO: I dont think 'required' makes sense for checkboxes
          break;
        case 'SELECT':
          formObj[fieldDef.key] = [];
          if (fieldDef.required) { formObj[fieldDef.key].push(Validators.required); }
          break;
        case 'DATE':
          formObj[fieldDef.key] = [new Date()];
          if (fieldDef.required) { formObj[fieldDef.key].push(Validators.required); }
          break;
        default:
          console.log(`Filed of type ${fieldDef.type} has not been implemented yet`);
      }
    }
    this.form = this.fb.group(formObj);

  }

  printValue() {
    console.log(this.form?.value);
  }

}
