import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit, OnChanges {
  @Input() contact: Contact | null = null;
  @Output() saveContact = new EventEmitter<Contact>();

  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    if (this.contact) {
      this.contactForm.patchValue({
        firstName: this.contact.firstName,
        lastName: this.contact.lastName,
        email: this.contact.email
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contact'] && this.contact) {
      this.contactForm.patchValue({
        firstName: this.contact.firstName,
        lastName: this.contact.lastName,
        email: this.contact.email
      });
    }
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const updatedContact: Contact = {
        ...this.contactForm.value,
        id: this.contact?.id || 1
      };

      this.saveContact.emit(updatedContact);
    }
  }

  onReset(): void {
    if (this.contact) {
      this.contactForm.reset({
        firstName: this.contact.firstName,
        lastName: this.contact.lastName,
        email: this.contact.email
      });
    } else {
      this.contactForm.reset();
    }
  }
}
