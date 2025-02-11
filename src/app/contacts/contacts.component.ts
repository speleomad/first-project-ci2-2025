import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../shared/contact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
   
  contacts!:Contact[];
  constructor(private router:Router,
              private contactService:ContactService){}
  ngOnInit(): void {
   this.contacts=this.contactService.getAllContact();
  }
  deleteContact(id:number){
    this.contactService.deleteContactById(id);
  }

  goToAbout(){
    //this.router.navigate(['/about']);
    this.router.navigateByUrl('/about');
  }
}
