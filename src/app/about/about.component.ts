import { Component, OnInit } from '@angular/core';
import { AboutService } from '../services/about.service';
import { Comment } from '../shared/comment';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  /* template:`<div class="my-class">
               hello from app about
              </div>`, */
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  colors={"odd":"red", "even":"green"};
  info:any;
  comment:Comment={"id":-1,"date":null, "message":""};
  newComment:boolean=false;
  comments:Comment[]=[]

  constructor(private aboutService: AboutService){}  
  ngOnInit(): void {
    this.info=this.aboutService.getInfos();
    this.comments=this.aboutService.getAllComments();
  }

   addComment(){
    this.aboutService.addComment({
      "id":this.comment.id,
      "date":this.comment.date,
      "message":this.comment.message
    })
    this.comment.message="";
    //console.log("New Comment!");
    //console.log("New comment:"+this.comment.message)
    // this.comments.push({
    //   date:new Date(),
    //   message:this.comment.message
    // })
   // this.newComment=true
  }
}