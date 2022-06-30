import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';

@Component({
  selector: 'app-final-result',
  templateUrl: './final-result.component.html',
  styleUrls: ['./final-result.component.css']
})
export class FinalResultComponent implements OnInit {

  constructor(private LearningService:LearningService) { }
   search:any;
   roleid:any;
   userid:any;
  ngOnInit(): void {
    this.roleid = sessionStorage.getItem('roleid');
    this.userid = sessionStorage.getItem('userid');
    this.GetTestResponsenew();
  }


  // Marks:any;
  // public GetTestResponse() {
  //   debugger
  //   this.LearningService.GetTestResponse().subscribe(
  //     data => {
  //       debugger
  //       this.Marks = data;
  //     })
  // }


    
  Marks:any;
  public GetTestResponsenew() {
    debugger
    this.LearningService.GetTestResponsenew().subscribe(
      data => {
        debugger
        if(this.roleid==4){
          this.Marks = data.filter(x=>x.trainerID==this.userid);
        }
        else{
          this.Marks = data;
        }
       
        
      })
  }




}
