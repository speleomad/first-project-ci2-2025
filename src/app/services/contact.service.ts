import { Injectable } from '@angular/core';
import { CONTACTS } from '../shared/contacts';
import { Contact } from '../shared/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts:Contact[]=CONTACTS;
  constructor() { }

  getAllContact():Contact[]{
    return this.contacts;
  }
  getContactbyId(id:number):Contact|undefined{
    return this.contacts.find(contact=>contact.id==id);
  }
  deleteContactById(id:number){
    let index=this.contacts.findIndex(contact=>contact.id==id);
    this.contacts.splice(index,1)
  }

  addContact(contact:Contact):Contact{
    contact.id=this.contacts[(this.contacts.length-1)].id+1
    this.contacts.push(contact);
    return contact;
}

}
