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
   
  contacts: Contact[];
  errMsg:string;
  isWaiting:boolean=true;
  public constructor(private router: Router, private contactService: ContactService) { }
  ngOnInit(): void {
    //this.contacts = this.contactService.getContacts();
    this.contactService.getAllContacts()
                       .subscribe({next:(contacts)=>{this.contacts=contacts;this.isWaiting=false;},
                                    error:(errmess)=>{this.contacts=[];
                                                      this.errMsg=<any>errmess;this.isWaiting=false;},
                                    });                                                                 
  }
 onDeleteContact(id: number) {
    // this.contactService.deleteContactById(id);
    this.contactService.deleteContactById(id).subscribe(
      {
          next: result => {
          console.log("contact deleted!");
          let index = this.contacts.findIndex(contact => contact.id == id)
          this.contacts.splice(index, 1);
        }
      }
    );

  }

  goToAbout(){
    //this.router.navigate(['/about']);
    this.router.navigateByUrl('/about');
  }
  onAddContact(){
    this.router.navigate(["/contacts/edit/-1"]);
  }
  onAddContactReactiveForm(){
    this.router.navigate(["/contacts/edit-reactive-form"]);
  }
}
