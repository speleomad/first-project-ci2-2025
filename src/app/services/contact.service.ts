import { Inject, Injectable } from '@angular/core';
import { CONTACTS } from '../shared/contacts';
import { Contact } from '../shared/contact';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  //contacts:Contact[]=CONTACTS;
  contacts:Contact[];
  httpOptions={
    headers:new HttpHeaders({'Content-Type':'application/json'})
  };
  constructor(private http: HttpClient,  
              @Inject('BaseURL')private baseUrl:string,
              private processHTTPMsgService : ProcessHttpmsgService ) { }

  getAllContacts(): Observable<Contact[]> {
    //return this.contacts;
  return  this.http.get<Contact[]>(this.baseUrl+"contacts")
                  .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getContactById(id: number): Observable<Contact> {
   // return this.contacts.find(contact => contact.id == id);
   return this.http.get<Contact>(this.baseUrl+"contacts/"+id);
  }
  deleteContactById(id: number): Observable<Contact> {
     return this.http.delete<Contact>(this.baseUrl+"contacts/"+id);

   /* let index = this.contacts.findIndex(contact => contact.id == id)
    this.contacts.splice(index, 1);*/
  }
  addContact(contact: Contact): Observable<Contact> {
  /*  contact.id = this.contacts[this.contacts.length - 1].id + 1;
    this.contacts.push(contact);*/
   
    return this.http.post<Contact>(this.baseUrl+"contacts",contact,this.httpOptions);
  }
  updateContact(contact: Contact):Observable<Contact>{
    return this.http.put<Contact>(this.baseUrl+"contacts/"+contact.id,contact,this.httpOptions)
  }

 /*  getAllContact():Observable<Contact[]>{
    return this.http.get<Contact[]>("http://localhost:3000/contacts");
   // return this.contacts;
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
} */

}
