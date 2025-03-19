import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Contact } from '../shared/contact';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  contact!: Contact;
  constructor(private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (resutl) => {
        let id = resutl.get('id')
        //Update
        if (id != "-1") this.initContact(id);
        else this.contact = new Contact(null, "", "", "", [], "images/default-avatar.jpg", false)
      }
    )
  }
  initContact(id: any) {
    this.contactService.getContactById(id).subscribe({
      next: (contact) => {
        this.contact = contact;
        //Convertir  contact.projects en une chaine de caractères.
        this.contact.projects[0] = contact.projects.join(",")
      },
      error: (err) => console.log("error")
    })
  }
  onSubmit() {
    // Convertir projects en tableau de chaine de caractères
    this.contact.projects = this.contact.projects.toString().split(',').map(project => project.trim());
    //Add product
    if (this.contact.id == null) {
      this.contactService.addContact(this.contact).subscribe({
        next: (contact) => { this.router.navigateByUrl("/contacts/" + contact.id) },
        error: (error) => { console.log("add contact failed!") },
        complete: () => console.log("end")
      });
    } else { //update contact
      this.contactService.updateContact(this.contact).subscribe({
        next: (contact) => { this.router.navigateByUrl("/contacts/" + contact.id) },
        error: (error) => { console.log("add contact failed!") },
        complete: () => console.log("end")
      });
    }
  }
  onContacts() {
    this.router.navigateByUrl('/contacts')
  }
}
