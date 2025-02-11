import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from '../shared/contact';
import { Subscription } from 'rxjs';
import { ContactService } from '../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit, OnDestroy {
  idContact!: number;
  contact: Contact | undefined;
  private routeSub!: Subscription;

  constructor(private contactService: ContactService,
              private route: ActivatedRoute,
              private router:Router){}
  ngOnInit(): void {
      /*snapshot method */ 
      // this.idContact=this.route.snapshot.params['id'];
      /*observable method*/
      this.routeSub = this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) { // Check if 'id' is not null
          this.idContact = +id; // Convert 'id' from string to number
          this.contact = this.contactService.getContactbyId(this.idContact);
        }
      });
  }
  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();   // Unsubscribe to avoid memory leaks
    }
  }
  OnContacts(){
    this.router.navigateByUrl('/contacts');
  }
}
