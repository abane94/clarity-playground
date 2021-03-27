import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-material-editor',
  templateUrl: './material-editor.component.html',
  styleUrls: ['./material-editor.component.scss']
})
export class MaterialEditorComponent implements OnInit {

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
