import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormFieldDefinition } from '../user-defined-form-viewer/user-defined-form-viewer.component';

@Component({
  selector: 'app-material-editor',
  templateUrl: './material-editor.component.html',
  styleUrls: ['./material-editor.component.scss']
})
export class MaterialEditorComponent implements OnInit {
  public formDef?: {key: string, fields: FormFieldDefinition[]};
  form: FormGroup;
  // itemsArray: FormArray;

  // i: FormFieldDefinition[] = [];
  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      name: '',
      options: [[{"type":"TEXT","key":"","label":"","placeholder":"","required":false}]]
    });
  }
  ngOnInit(): void {
    this.formDef = {
      key: 'MyForm',
      fields: [
        {
          type: 'SELECT',
          key: 'type',
          label: 'Field Type',
          multiple: false,
          // default,
          options: {
            type: 'PLAINTEXT',  // TODO: other could be possible, like loading from db somehow
            options: [
              {
                value: 'TEXT',
                display: 'TEXT',
                default: true,
              },
              {
                value: 'NUMBER',
                display: 'NUMBER',
              },
              {
                value: 'CHECK',
                display: 'CHECK',
              },
              // {
              //   value: 'DATE',
              //   display: 'DATE',
              // },
              {
                value: 'SELECT',
                display: 'SELECT',
              }
            ]
          },
          required: true
        },
        {
          type: 'TEXT',
          key: 'key',
          label: 'Field Key',
          placeholder: 'Field Key',
          required: true
        },
        {
          type: 'TEXT',
          key: 'label',
          label: 'Field Label',
          placeholder: 'Field Label',
          required: true
        },
        {
          type: 'TEXT',
          key: 'placeholder',
          label: 'Placeholder',
          placeholder: 'Placeholder',
          required: true
        },
        {
          type: 'CHECK',
          key: 'required',
          label: 'Required',
          default: false
        },
        // {
        //   key: "test",
        //   label: "Test",
        //   placeholder: "Enter Test here",
        //   required: true,
        //   type: "TEXT"
        // }
      ]
    };
  }


  // createItem() {
  //   return this.fb.group({
  //     type: 'TEXT',
  //     key: ['', Validators.required],
  //     label: ['', Validators.required],
  //     placeholder: '',
  //     default: '',
  //     required: false,
  //   });
  // }

  print() {
    console.log(JSON.stringify(this.form.value))
  }

  // add() {
  //   this.itemsArray.push(this.createItem());
  // }

}
