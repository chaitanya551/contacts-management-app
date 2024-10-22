import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnChanges {
  @Input() contact: Contact | null = null; 
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contact'] && this.contact == null) {
      this.contactForm.reset();
    } else if (this.contact) {
      this.contactForm.patchValue(this.contact);
    }
  }

  onSubmit(): void {
  }

  onReset(): void {
    this.contactForm.reset();
  }
}
