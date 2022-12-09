import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-enrolled-training',
  templateUrl: './enrolled-training.component.html',
  styleUrls: ['./enrolled-training.component.css']
})
export class EnrolledTrainingComponent implements OnInit {

  joblist: any;
  search: any;
  count: any;
  staffid: any;
  manager: any;
  ename: any;
  currentUrl: any;
  result: any;
  employeeList: any;
  employeeid: any;
  id: any;
  show: any;
  employeedetails: any;
  dummemployeedetails: any;
  getid: any 
  uniquelist : any 
  getemployeeid : any
  todaydate:any;

  constructor(public LearningService: LearningService) {}

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
  ;
    this.show = 2;
    this.manager = sessionStorage.getItem('userid');
    //this.Acceptcandidate()
    // this.insertdetails()
    this.GetEnroll();
  }


public GetEnroll(){
  this.LearningService.GetEnroll()
  .subscribe({
    next: (data) => {
      debugger;
      // this.result = data.filter(x => x.manager == this.manager );
      this.result = data.filter(
        (x) => (x.status == 'Manager Approved'||x.status=="Manager Assign") && x.manager == this.manager && x.mandatory==1
      );
      this.count = this.result.length;
    },
   error: (err: { error: { message: any; }; }) => {
      Swal.fire('Issue in GetEnroll');
      // Insert error in Db Here//
      var obj = {
        PageName: this.currentUrl,
        ErrorMessage: err.error.message,
      };
      this.LearningService.InsertExceptionLogs(obj).subscribe((data) => {
        debugger;
      });
    },
  });
}











  public Acceptcandidate() {
    debugger;
    var json = {
      ID: this.id,
      Status: 'Manager Approved',
    };

    this.LearningService.UpdateErollmentStatusApproved(json).subscribe({
      next: (data) => {
        debugger;
        let result = data;
        // Swal.fire({
        //   position: 'center',
        //   icon: 'success',
        //   title: 'Approved!!',
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
        this.Showcards(1);
      },
     error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in UpdateErollmentStatusApproved');
        // Insert error in Db Here//
        var obj = {
          PageName: this.currentUrl,
          ErrorMessage: err.error.message,
        };
        this.LearningService.InsertExceptionLogs(obj).subscribe((data) => {
          debugger;
        });
      },
    });
  }
  Showcards(value: any) {
    this.show = value;
    if (value == 1) {
      this.LearningService.GetEnroll()
      .subscribe({
        next: (data) => {
          debugger;
          // this.result = data.filter(x => x.manager == this.manager );
          this.result = data.filter(
            (x) => x.status == 'Manager Approved' && x.manager == this.manager
          );
          this.count = this.result.length;
        },
       error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in GetEnroll');
          // Insert error in Db Here//
          var obj = {
            PageName: this.currentUrl,
            ErrorMessage: err.error.message,
          };
          this.LearningService.InsertExceptionLogs(obj).subscribe((data) => {
            debugger;
          });
        },
      });

      // this.GetCourse();
    } else if (value == 2) {
      this.LearningService.GetEnroll()
      .subscribe({
        next: (data) => {
          debugger;
          // this.result = data.filter(x => x.manager == this.manager );
          this.result = data.filter(
            (x) => x.status == 'Manager Pending' && x.manager == this.manager
          );
          this.count = this.result.length;
        },
       error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in GetEnroll');
          // Insert error in Db Here//
          var obj = {
            PageName: this.currentUrl,
            ErrorMessage: err.error.message,
          };
          this.LearningService.InsertExceptionLogs(obj).subscribe((data) => {
            debugger;
          });
        },
      });

      // this.GetApproveCourse();
    } else if (value == 3) {
      this.LearningService.GetEnroll()
      .subscribe({
        next: (data) => {
          debugger;
          // this.result = data.filter(x => x.manager == this.manager );
          this.result = data.filter(
            (x) => x.status == 'Manager Rejected' && x.manager == this.manager
          );
          this.count = this.result.length;
        },
       error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in GetEnroll');
          // Insert error in Db Here//
          var obj = {
            PageName: this.currentUrl,
            ErrorMessage: err.error.message,
          };
          this.LearningService.InsertExceptionLogs(obj).subscribe((data) => {
            debugger;
          });
        },
      });

      // this.GetApproveCourse();
    }
  }

  fileName = 'Enrolled Training Reports.xlsx';
  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('download');
    debugger;
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    debugger;

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
    // this.loader = false;
  }

}

 