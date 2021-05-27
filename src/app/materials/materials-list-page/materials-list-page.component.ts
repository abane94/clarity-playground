import { Component, OnInit } from '@angular/core';
import { NestedDisplayFields } from 'src/app/forms/user-defined-form-data-display/user-defined-form-data-display.component';
import { FormDefinition } from 'src/app/forms/user-defined-form-viewer/user-defined-form-viewer.component';

interface User {
  id: number;
  name: string;
  creation: Date;
  color: string;
}

@Component({
  selector: 'app-materials-list-page',
  templateUrl: './materials-list-page.component.html',
  styleUrls: ['./materials-list-page.component.scss']
})
export class MaterialsListPageComponent implements OnInit {
  nestedDisplayField: NestedDisplayFields = {
    MaterialOptions: {
      field: 'name',
      nested: {
        SelectionsInnerForm: {
          field: 'display'
        }
      }
    }
  };

  formDef: FormDefinition = {
    key: 'dgsdfgsfdh',
    fields: [
      {
        type: 'TEXT',
        key: 'name',
        label: 'Name',
        placeholder: '',
        required: true
      },
      {
        type: 'TEXT',
        key: 'description',
        label: 'Description',
        placeholder: '',
        required: true
      },
      {
        type: 'TEXT',
        key: 'category',
        label: 'Category',
        placeholder: '',
        required: true
      },
      {
        type: 'NUMBER',
        key: 'baseCost',
        label: 'Base Cost',
        placeholder: '',
        required: true
      },
      {
        type: 'TEXT',
        key: 'supplier',
        label: 'Supplier',
        placeholder: '',
        required: true
      },
      {
        type: 'TEXT',
        key: 'supplierItemUrl',
        label: 'supplierItemUrl',
        placeholder: '',
        required: true
      },
      {
        type: 'NESTED',
        key: 'options',
        label: 'Options',
        innerForm: {
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
                key: 'SelectionsInnerForm',
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
  };
  materials: any[] = [
    {
      id: 1,
      name: 'TShirt',
      description: 'A simple tshirt',
      'category': 'clothing',
      'baseCost': 1.45,
      'supplier': 'gilden',
      'supplierItemUrl': 'dsagfds',
      'options': {
        'items': [
          {
            'name': 'Size',
            'selections': {
              'items': [
                {
                  'value': 'M',
                  'display': 'M',
                  'img': '',
                  'priceAdjustment': 0
                },
                {
                  'value': 'S',
                  'display': 'S',
                  'img': '',
                  'priceAdjustment': 0
                },
                {
                  'value': 'XXL',
                  'display': 'XXL',
                  'img': '',
                  'priceAdjustment': 0.1
                }
              ]
            }
          },
          {
            'name': 'Color',
            'selections': {
              'items': [
                {
                  'value': 'BLUE',
                  'display': 'BLUE',
                  'img': '',
                  'priceAdjustment': 0
                },
                {
                  'value': 'RED',
                  'display': 'RED',
                  'img': '',
                  'priceAdjustment': 0
                },
                {
                  'value': 'TIE DYE',
                  'display': 'TIE',
                  'img': 'DYE',
                  'priceAdjustment': 0.15
                }
              ]
            }
          }
        ]
      }
    },
    {
      id: 2,
      name: 'Long Sleeve',
      description: 'A simple tshirt',
      'category': 'clothing',
      'baseCost': 1.45,
      'supplier': 'gilden',
      'supplierItemUrl': 'dsagfds',
      'options': {
        'items': [
          {
            'name': 'Size',
            'selections': {
              'items': [
                {
                  'value': 'M',
                  'display': 'M',
                  'img': '',
                  'priceAdjustment': 0
                },
                {
                  'value': 'S',
                  'display': 'S',
                  'img': '',
                  'priceAdjustment': 0
                },
                {
                  'value': 'XXL',
                  'display': 'XXL',
                  'img': '',
                  'priceAdjustment': 0.1
                }
              ]
            }
          },
          {
            'name': 'Color',
            'selections': {
              'items': [
                {
                  'value': 'BLUE',
                  'display': 'BLUE',
                  'img': '',
                  'priceAdjustment': 0
                },
                {
                  'value': 'RED',
                  'display': 'RED',
                  'img': '',
                  'priceAdjustment': 0
                },
                {
                  'value': 'TIE DYE',
                  'display': 'TIE',
                  'img': 'DYE',
                  'priceAdjustment': 0.15
                }
              ]
            }
          }
        ]
      }
    },
    {
      id: 3,
      name: 'Hoodie',
      description: 'A simple tshirt',
      'category': 'clothing',
      'baseCost': 1.45,
      'supplier': 'gilden',
      'supplierItemUrl': 'dsagfds',
      'options': {
        'items': [
          {
            'name': 'Size',
            'selections': {
              'items': [
                {
                  'value': 'M',
                  'display': 'M',
                  'img': '',
                  'priceAdjustment': 0
                },
                {
                  'value': 'S',
                  'display': 'S',
                  'img': '',
                  'priceAdjustment': 0
                },
                {
                  'value': 'XXL',
                  'display': 'XXL',
                  'img': '',
                  'priceAdjustment': 0.1
                }
              ]
            }
          },
          {
            'name': 'Color',
            'selections': {
              'items': [
                {
                  'value': 'BLUE',
                  'display': 'BLUE',
                  'img': '',
                  'priceAdjustment': 0
                },
                {
                  'value': 'RED',
                  'display': 'RED',
                  'img': '',
                  'priceAdjustment': 0
                },
                {
                  'value': 'TIE DYE',
                  'display': 'TIE',
                  'img': 'DYE',
                  'priceAdjustment': 0.15
                }
              ]
            }
          }
        ]
      }
    }
  ];

  selected!: User[];
  constructor() { }

  ngOnInit(): void {
  }

}
