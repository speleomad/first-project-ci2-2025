import { Component } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Contact } from '../shared/contact';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent {

  constructor(private contactService: ContactService,
    private router: Router
  ) { }

  onSubmit(form: NgForm) {
    //console.log(form.value)
    let contact: Contact = {
      id: -1,
      //name:form.value['name']
      name: form.value.name,
      email: form.value.email,
      website: form.value.website,
      projects: [form.value.projects],
      featured: false,
      image: '../../assets/images/default-avatar.jpg'
    }
    contact= this.contactService.addContact(contact);
    this.router.navigateByUrl("/contacts/"+contact.id);
  }
  onContacts() {
    this.router.navigateByUrl('/contacts')
  }
}
