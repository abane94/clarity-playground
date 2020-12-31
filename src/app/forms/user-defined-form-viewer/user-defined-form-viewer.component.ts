import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


interface FormFieldDefinitionBase<T> {
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

interface NumberFormFieldDefinition extends FormFieldDefinitionBase<number> {
  type: 'NUMBER';
  step?: number;
  // min and max can be done with validators
}

interface BoolFormFieldDefinition extends FormFieldDefinitionBase<boolean> {
  type: 'CHECK' | 'TOGGLE'
  // TODO: will this work, using the same interface, because there might not be a reason to seperate
  // TODO: alternative the one reason to seperate could be tri-state fields, but that might still be achievable with the same interface
}

interface OptionDefinition {
  value: string;
  display: string;
}

interface OptionsSource {
  type: 'PLAINTEXT';  // TODO: other could be possible, like loading from db somehow
  options: OptionDefinition[];
}

interface MultiFormFieldDefinition {
  type: 'RADIO' | 'AUTOCOMPLETE' | 'SELECT';
  required?: boolean;  // this is required here to use this property on the generic FormFieldDefinition
  key: string;
  label: string;
  options: OptionsSource;
  multiple: boolean;  // TODO check to see which components this is possible on, and the editor will have to make sure it checks out
}


type FormFieldDefinition = TextFormFieldDefinition | NumberFormFieldDefinition | BoolFormFieldDefinition | MultiFormFieldDefinition;

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
      }
    ]
  };

  public form: FormGroup | undefined;

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
          formObj[fieldDef.key] = [fieldDef.default || '']
          if (fieldDef.required) { formObj[fieldDef.key].push(Validators.required); }
          break;
        default:
          console.log(`Filed of type ${fieldDef.type} has not been implemented yet`);
      }
    }
    this.form = this.fb.group(formObj);

  }

}
