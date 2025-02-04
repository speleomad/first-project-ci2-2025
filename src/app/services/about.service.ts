import { Injectable } from '@angular/core';
import { Comment } from '../shared/comment';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  info = {
    name: "CI2",
    email: "ci2@fsb.ucar.tn",
    tel: "99999999"
  }
  comments:Comment[]=[];
  constructor() { }

  getInfos(){
    return this.info;
  }
  addComment(comment:Comment){
     this.comments.push({
      id:this.comments.length+1,
      date:new Date(),
      message:comment.message
     })
  }
  getAllComments():Comment[]{
    return this.comments;
  }
}
