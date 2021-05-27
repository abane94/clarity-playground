import { Component, Input, OnInit } from '@angular/core';
import { castNestedField, castOptionsField, FormDefinition, FormFieldDefinition } from '../user-defined-form-viewer/user-defined-form-viewer.component';

export interface NestedDisplayFields {
  [formKey: string]: { field: string; nested?: NestedDisplayFields }
}

@Component({
  selector: 'app-user-defined-form-data-display',
  templateUrl: './user-defined-form-data-display.component.html',
  styleUrls: ['./user-defined-form-data-display.component.scss']
})
export class UserDefinedFormDataDisplayComponent implements OnInit {
  @Input()
  public formDef!: FormDefinition;

  @Input()
  public data!: any;

  @Input()
  nestedDisplayField?: NestedDisplayFields

  constructor() { }

  ngOnInit(): void {
  }

  // helper methods to cast the fields in the template
  castOptionsField = castOptionsField;
  castNestedField = castNestedField;

  accordionPanelDisplay(subData: any, field: FormFieldDefinition): string {
    if (!subData || !this.nestedDisplayField) {
      return '';
    }
    const key = castNestedField(field).innerForm?.key || '';
    const display = this.nestedDisplayField[key]?.field
    return subData[display];
  }

  getNestedDisplayFieldObject(field: FormFieldDefinition) {
    if (!this.nestedDisplayField) {
      return;
    }
    const key = castNestedField(field).innerForm.key || '';
    return this.nestedDisplayField[key]?.nested
  }

}
