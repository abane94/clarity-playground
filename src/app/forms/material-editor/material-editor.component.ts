import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { FormFieldDefinition } from '../user-defined-form-viewer/user-defined-form-viewer.component';

@Component({
  selector: 'app-material-editor',
  templateUrl: './material-editor.component.html',
  styleUrls: ['./material-editor.component.scss']
})
export class MaterialEditorComponent implements OnInit {
  public formDef!: { key: string, fields: FormFieldDefinition[] };
  form: FormGroup;
  // itemsArray: FormArray;

  // i: FormFieldDefinition[] = [];
  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      name: '',
      description: '',
      category: '',
      baseCost: 0.0,
      supplier: '',
      supplierItemUrl: '',
      // tags: [{}],

      options: []
    });
  }
  ngOnInit(): void {
    this.formDef = {
      key: 'MaterialOptions',
      fields: [
        {
          type: 'TEXT',
          key: 'name',
          label: 'Options Name',
          placeholder: '',
          required: true
        },
        {
          type: 'NESTED',
          key: 'selections',
          label: 'Selections',
          innerForm: {
            key: 'CAN_YOU_SEE_THIS-SELECTIONS',
            fields: [
              {
                type: 'TEXT',
                key: 'value',
                label: 'Value',
                placeholder: '',
                required: true
              },
              {
                type: 'TEXT',
                key: 'display',
                label: 'Display',
                placeholder: '',
                required: true
              },
              {
                type: 'TEXT',
                key: 'img',
                label: 'Image',
                placeholder: '',
                required: false
              },
              {
                type: 'NUMBER',
                key: 'priceAdjustment',
                label: 'Price Adjustment (per unit)',
                // placeholder: '',
                required: false,
                step: 0.01
              }
            ]
          }
        }
      ]
    }
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


/*
    Example form

    {
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
          required: true,
          default: 'My Field Key'
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
        {
          type: 'NESTED',
          key: 'people',
          label: 'People',
          innerForm: {
            key: 'MyInnerForm',
            fields: [
              {
                type: 'SELECT',
                key: 'color',
                label: 'Favorite Color',
                multiple: false,
                options: {
                  type: 'PLAINTEXT',
                  options: [
                    {
                      value: 'Blue',
                      display: 'Blue',
                      default: true,
                    },
                    {
                      value: 'RED',
                      display: 'RED',
                    },
                    {
                      value: 'Yellow',
                      display: 'Yellow',
                    },
                    {
                      value: 'Green',
                      display: 'Green',
                    }
                  ]
                },
                required: true
              },
              {
                type: 'TEXT',
                key: 'firstName',
                label: 'First Name',
                placeholder: 'First Name',
                required: true
              },
              {
                type: 'TEXT',
                key: 'lastName',
                label: 'Last Name',
                placeholder: 'Last Name',
                required: true
              },
              {
                type: 'TEXT',
                key: 'nickName',
                label: 'Nick Name',
                placeholder: 'Nick Name',
                required: true
              },
              {
                type: 'CHECK',
                key: 'required',
                label: 'Are you cool',
                default: false
              },
              {
                type: 'NESTED',
                key: 'friends',
                label: 'Friends',
                innerForm: {
                  key: 'MyFirends',
                  fields: [
                    {
                      type: 'TEXT',
                      key: 'firstName',
                      label: 'First Name',
                      placeholder: 'First Name',
                      required: true
                    },
                    {
                      type: 'TEXT',
                      key: 'lastName',
                      label: 'Last Name',
                      placeholder: 'Last Name',
                      required: true
                    },
                    {
                      type: 'SELECT',
                      key: 'color',
                      label: 'Favorite Color',
                      multiple: false,
                      options: {
                        type: 'PLAINTEXT',
                        options: [
                          {
                            value: 'Blue',
                            display: 'Blue',
                            default: true,
                          },
                          {
                            value: 'RED',
                            display: 'RED',
                          },
                          {
                            value: 'Yellow',
                            display: 'Yellow',
                          },
                          {
                            value: 'Green',
                            display: 'Green',
                          }
                        ]
                      },
                      required: true
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    };

*/



/*
        Full material as inner form


{
      key: 'Material',
      fields: [
        // cost: number;  // base cost - last ordered cost?
        // suplier: string or id;
        {
          type: 'TEXT',
          key: 'name',
          label: 'Material Name',
          placeholder: 'Name',
          required: true,
          default: ''
        },
        {
          type: 'TEXT',
          key: 'Description',
          label: 'Description',
          placeholder: 'Name',
          required: true,
          default: ''
        },
        {
          type: 'NESTED',
          key: 'tags',
          label: 'Tags',
          innerForm: {
            key: 'MaterialTags',
            fields: [
              {
                type: 'TEXT',
                key: 'tag',
                label: 'Tag',
                placeholder: '',
                required: true
              }
            ]
          }
        },
        {
          // TODO: select with queried data
          type: 'TEXT',
          key: 'category',
          label: 'Material Category',
          placeholder: '',
          required: true,
          default: ''
        },
        {
          type: 'NUMBER',
          key: 'cost',
          label: 'Base Cost',
          required: true,
          default: 0,
          step: 0.01
        },
        {
          // TODO: select with queried data
          type: 'TEXT',
          key: 'supplier',
          label: 'Supplier',
          placeholder: '',
          required: true,
          default: ''
        },
        {
          type: 'TEXT',
          key: 'supplierLink',
          label: 'Supplier Item Link',
          placeholder: '',
          required: false,
          default: ''
        },
        {
          type: 'NESTED',
          key: 'options',
          label: 'Options',
          innerForm: {
            key: 'CAN_YOU_SEE_THIS',
            fields: [
              {
                type: 'TEXT',
                key: 'name',
                label: 'Options Name',
                placeholder: '',
                required: true
              },
              {
                type: 'NESTED',
                key: 'selections',
                label: 'Selections',
                innerForm: {
                  key: 'CAN_YOU_SEE_THIS-SELECTIONS',
                  fields: [
                    {
                      type: 'TEXT',
                      key: 'value',
                      label: 'Value',
                      placeholder: '',
                      required: true
                    },
                    {
                      type: 'TEXT',
                      key: 'display',
                      label: 'Display',
                      placeholder: '',
                      required: true
                    },
                    {
                      type: 'TEXT',
                      key: 'img',
                      label: 'Image',
                      placeholder: '',
                      required: false
                    },
                    {
                      type: 'NUMBER',
                      key: 'priceAdjustment',
                      label: 'Price Adjustment (per unit)',
                      // placeholder: '',
                      required: false,
                      step: 0.01
                    }
                  ]
                }
              }
            ]
          }
        }

      ]
    }



*/
