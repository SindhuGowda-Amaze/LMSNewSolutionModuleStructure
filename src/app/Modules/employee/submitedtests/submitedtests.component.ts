import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-submitedtests',
  templateUrl: './submitedtests.component.html',
  styleUrls: ['./submitedtests.component.css']
})
export class SubmitedtestsComponent implements OnInit {

  result: any;
  constructor(public LearningService: LearningService) { }
  staffid: any;
  search: any;
  date:any;
 count:any;
resultemployee:any;
  ngOnInit(): void {

    this.staffid = sessionStorage.getItem('userid');

    this.LearningService.GetTestResponsenew().subscribe(
      data => {
        debugger
        this.result = data.filter(x => x.checked == 1);
        this.resultemployee = this.result;
        this.count = this.result.length;
      })
  }
  public getdate(even:any){
    debugger
this.date=even.target.value;

this.filterdate();
  }
  public filterdate(){
    debugger
    this.LearningService.GetTestResponsenew().subscribe(
      data => {
        debugger
        this.result = data.filter(x => x.checked == 1 && x.modifiedDate==this.date);
        this.count = this.result.length;
      })
  }

  public filterSubmittedEmployee() {
    debugger
    let searchCopy = this.search.toLowerCase();
    this.result = this.resultemployee.filter((x: { staffname: string, coursename:string, chaptername:string, 
      emailID:string }) => (x.staffname.toLowerCase().includes(searchCopy))||
    (x.coursename.toLowerCase().includes(searchCopy))||(x.chaptername.toLowerCase().includes(searchCopy))||
    (x.emailID.toLowerCase().includes(searchCopy)));
    
    this.count = this.result.length;
    // location.reload();
  }


}
