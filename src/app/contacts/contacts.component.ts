import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  selectedContact: Contact | null = null;
  isModalOpen = false;
  toastMessage: string = '';

  searchText: string = '';
  contactsPerPage = 5;
  currentPage = 1;
  totalPages = 1;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.contactService.getContacts().subscribe(
      (contacts) => {
        this.contacts = contacts;
        this.filteredContacts = contacts;
        this.totalPages = Math.ceil(this.filteredContacts.length / this.contactsPerPage);
        this.showToast('Contacts loaded successfully!');
      },
      (error) => {
        this.showToast('Failed to load contacts.', true);
      }
    );
  }

  openModal(): void {
    this.selectedContact = null;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  addOrUpdateContact(contact: Contact): void {
    if (this.selectedContact) {
      this.contactService.updateContact(this.selectedContact.id, contact).subscribe(
        () => {
          this.getContacts();
          this.showToast('Contact updated successfully!');
          this.closeModal();
        },
        (error) => {
          this.showToast('Failed to update contact.', true);
        }
      );
    } else {
      this.contactService.addContact(contact).subscribe(
        () => {
          this.getContacts();
          this.showToast('Contact added successfully!');
          this.closeModal();
        },
        (error) => {
          this.showToast('Failed to add contact.', true);
        }
      );
    }
  }


  editContact(contactId: number): void {
    this.contactService.getContactById(contactId).subscribe(
      (contact) => {
        this.selectedContact = contact;
        this.isModalOpen = true;
      },
      (error) => {
        this.showToast('Failed to load contact.', true);
      }
    );
  }

  deleteContact(contactId: number): void {
    this.contactService.deleteContact(contactId).subscribe(
      () => {
        this.getContacts();
        this.showToast('Contact deleted successfully!');
      },
      (error) => {
        this.showToast('Failed to delete contact.', true);
      }
    );
  }

  filterContacts(): void {
    if (this.searchText.trim()) {
      this.filteredContacts = this.contacts.filter((contact) =>
        contact.firstName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        contact.email.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredContacts = this.contacts;
    }
    this.totalPages = Math.ceil(this.filteredContacts.length / this.contactsPerPage);
  }

  sortContacts(property: keyof Contact): void {
    this.filteredContacts.sort((a: Contact, b: Contact) => {
      const valueA = a[property];
      const valueB = b[property];
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
      }
      if (valueA < valueB) {
        return -1;
      }
      if (valueA > valueB) {
        return 1;
      }
      return 0;
    });
  }
  

  get paginatedContacts(): Contact[] {
    const start = (this.currentPage - 1) * this.contactsPerPage;
    const end = start + this.contactsPerPage;
    return this.filteredContacts.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  showToast(message: string, isError: boolean = false): void {
    this.toastMessage = message;
    const toastElement = document.getElementById('liveToast');
    if (toastElement) {
      toastElement.classList.add('show');
      toastElement.classList.remove(isError ? 'bg-primary' : 'bg-danger');
      toastElement.classList.add(isError ? 'bg-danger' : 'bg-primary');
    }

    setTimeout(() => this.hideToast(), 3000);
  }

  hideToast(): void {
    const toastElement = document.getElementById('liveToast');
    if (toastElement) {
      toastElement.classList.remove('show');
    }
}
}
