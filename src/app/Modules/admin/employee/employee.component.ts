import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private ActivatedRoute: ActivatedRoute, public LearningService: LearningService, public router: Router) { }
  stafflist: any;
  term: any;
  search: any;
  id: any;

  ngOnInit(): void {

    // this.GetMyDetails();
    // this.ActivatedRoute.params.subscribe(params => {
    //   debugger
    //   this.id = params["id"];
    //   if (this.id != null && this.id != undefined) {
    //     this.GetMyDetails();
    //   }
    // })

    // this.GetMyDetails();
    debugger

    this.LearningService.GetMyDetails().subscribe(data => {
      debugger
      this.stafflist = data;
    });
  }

  date: any;
  public getdate(event: any) {
    debugger
    this.date = event.target.value;
    this.LearningService.GetMyDetails().subscribe(data => {
      debugger
      this.stafflist = data.filter(x => x.filterdate == this.date);
    });
  }

  // public Ondelete(id:any) {
  //   this.LearningService.DeleteMyDetails(id).subscribe(
  //     data => {
  //       debugger
  //       Swal.fire('Successfully Deleted...!');
  //       this.GetMyDetails();
  //     }
  //   )
  // }

  Ondelete(id:any){
    
  }



}
