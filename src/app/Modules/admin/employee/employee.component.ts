import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

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
  date: any;
  currentUrl:any;

  ngOnInit(): void {
    this.GetMyDetails();
    this.currentUrl = window.location.href;

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

  
  }

  GetMyDetails(){

    this.LearningService.GetMyDetails().subscribe({
      next: data => {
        debugger
      this.stafflist = data;
      },error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in GetMyDetails');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.LearningService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
    
  }


  public getdate(event: any) {
    debugger
    this.date = event.target.value;
    this.LearningService.GetMyDetails().subscribe({
      next: data => {
        debugger
      this.stafflist = data.filter(x => x.filterdate == this.date);
      },error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in GetMyDetails');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.LearningService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
    
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
