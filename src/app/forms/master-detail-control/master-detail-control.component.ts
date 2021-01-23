import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormFieldDefinition, FormFieldDefinitionBase } from '../user-defined-form-viewer/user-defined-form-viewer.component';

@Component({
  selector: 'app-master-detail-control',
  templateUrl: './master-detail-control.component.html',
  styleUrls: ['./master-detail-control.component.scss']
})
export class MasterDetailControlComponent implements OnInit {
  // items: string[] = [
  //   'what is your name?',
  //   'what is you age?'
  // ];
  form: FormGroup;
  itemsArray: FormArray;

  i: FormFieldDefinition[] = [];
  constructor(private fb: FormBuilder) {
    this.itemsArray = fb.array( [this.createItem()] );
    this.form = fb.group({items: this.itemsArray});
  }
  ngOnInit(): void {

  }

  get itemControls() {
    return this.itemsArray.controls as FormGroup[]
  }

  createItem() {
    // this.i.push({
    //   type: 'TEXT',
    //   key: '',
    //   label: '',
    //   placeholder: '',
    //   default: '',
    //   required: false,
    // })

    return this.fb.group({
      type: 'TEXT',
      key: ['', Validators.required],
      label: ['', Validators.required],
      placeholder: '',
      default: '',
      required: false,
    });
  }

  print() {
    console.log(JSON.stringify(this.form.value))
  }

  add() {
    this.itemsArray.push(this.createItem());
  }

}
