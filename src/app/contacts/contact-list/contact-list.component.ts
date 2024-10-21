import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent {
  @Input() contacts: any[] = [];
  @Output() editContact = new EventEmitter<number>();
  @Output() deleteContact = new EventEmitter<number>();

  onEdit(contactId: number): void {
    this.editContact.emit(contactId);
  }

  public onDelete(contactId: number): void {
    this.deleteContact.emit(contactId);
  }
}
