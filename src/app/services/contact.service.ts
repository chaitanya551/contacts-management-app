import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:5278/api/Contacts';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }

  getContactById(id: number): Observable<Contact> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Contact>(url);
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact, this.httpOptions);
  }

  updateContact(id: number, contact: Contact): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, contact, this.httpOptions);
  }

  deleteContact(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, this.httpOptions);
  }
}
