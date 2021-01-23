import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-item-modal-container',
  templateUrl: './list-item-modal-container.component.html',
  styleUrls: ['./list-item-modal-container.component.scss']
})
export class ListItemModalContainerComponent implements OnInit {
  isOpen = false;
  constructor() { }

  ngOnInit(): void {
  }

}
