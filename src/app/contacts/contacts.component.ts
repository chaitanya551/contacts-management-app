import { Component } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  contacts = [
    { id: 0, firstName: 'Alex', lastName: 'BlaBla', email: 'alex.blabla@aol.at' },
    { id: 1, firstName: 'Otto', lastName: 'Blubb', email: 'otto.blubb@dsl.de' },
    { id: 2, firstName: 'Peter', lastName: 'Pan', email: 'peter.pan@neverland.com' }
  ];
  selectedContact: any = null;
  isModalOpen = false;

  openModal(): void {
    this.selectedContact = null; 
    this.isModalOpen = true;
  }
  
  closeModal(): void {
    this.isModalOpen = false;
  }

  addOrUpdateContact(contact: any): void {
    if (this.selectedContact) {
      const index = this.contacts.findIndex(c => c.id === this.selectedContact.id);
      this.contacts[index] = { ...this.selectedContact, ...contact };
      this.selectedContact = null;
    } else {
      const newId = this.contacts.length > 0 ? Math.max(...this.contacts.map(c => c.id)) + 1 : 0;
      this.contacts.push({ ...contact, id: newId });
    }

    this.closeModal();
  }

  editContact(contactId: number): void {
    this.selectedContact = this.contacts.find(c => c.id === contactId);
    this.openModal();
  }

  deleteContact(contactId: number): void {
    this.contacts = this.contacts.filter(c => c.id !== contactId);
  }
}
