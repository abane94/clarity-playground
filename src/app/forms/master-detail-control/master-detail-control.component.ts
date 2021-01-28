import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericControlProvider, GenericControlValueAccessor } from '../GenericControlValueAccessor';
import { FormFieldDefinition, FormFieldDefinitionBase } from '../user-defined-form-viewer/user-defined-form-viewer.component';

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
  form: FormGroup;
  itemsArray: FormArray;

  i: FormFieldDefinition[] = [];
  constructor(private fb: FormBuilder) {
    super();
    this.itemsArray = fb.array( [this.createItem()] );
    this.form = fb.group({items: this.itemsArray});
    this.itemsArray.valueChanges.subscribe(value => {
      if (this._changeHandler) {
        this._changeHandler(this.itemsArray.value);
      }
    })
  }
  ngOnInit(): void {

  }

  get value(): any {
    // throw new Error('Method not implemented.');
    return this.itemsArray.value;
  }
  set value(v: any) {
    // throw new Error('Method not implemented.');
    this.itemsArray.setValue(v);
  }

  writeValue(obj: any): void {
      if (!this.initialSet) {
          this.initial = obj;
          this.initialSet = true
      }
      if (obj === null) {
          // angular will write null during reset if no arguments are given
          // this.val = this.initial,
          this.itemsArray.setValue(this.initial);
          this._changeHandler(this.val);
      } else {
          this.value = obj;
      }
  }

  _setDisabledState(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
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
