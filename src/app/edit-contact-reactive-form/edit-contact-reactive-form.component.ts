import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from '../shared/contact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-edit-contact-reactive-form',
  templateUrl: './edit-contact-reactive-form.component.html',
  styleUrls: ['./edit-contact-reactive-form.component.css']
})
export class EditContactReactiveFormComponent  implements OnInit {
  
  contactForm : FormGroup
  constructor(private formBuilder: FormBuilder,
              private router : Router,
              private contactService:ContactService){}
  ngOnInit(): void {
   this.intitForm();
  }
 
  intitForm():void{
      this.contactForm=this.formBuilder.group(
        { name:['',Validators.required],
          email:['', [Validators.required,Validators.email]],
          website:['',[Validators.required, Validators.pattern('https?://.+')]],
          projects:['',Validators.required]
        }
      )
  }
  onAddContact():void{
    //console.log(this.contactForm.value);
    //this.contactForm.reset();
     //console.log(form.value)
        let contact: Contact = {
          id: -1,
          //name:form.value['name']
          name: this.contactForm.value.name,
          email: this.contactForm.value.email,
          website: this.contactForm.value.website,
          projects: [this.contactForm.value.projects],
          featured: false,
          image: '../../assets/images/default-avatar.jpg'
        }
        //contact= this.contactService.addContact(contact);
        this.contactService.addContact(contact).subscribe(
          {next: (newContact)=>contact=newContact}
        )
        this.router.navigateByUrl("/contacts/"+contact.id);
  }   

  onContacts():void{
    this.router.navigateByUrl('/contacts');
  }
}
