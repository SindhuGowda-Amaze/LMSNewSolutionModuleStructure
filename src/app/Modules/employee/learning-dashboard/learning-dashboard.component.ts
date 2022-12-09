import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-learning-dashboard',
  templateUrl: './learning-dashboard.component.html',
  styleUrls: ['./learning-dashboard.component.css']
})
export class LearningDashboardComponent implements OnInit {

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private LearningService: LearningService
  ) {}

  search: any;
  id: any;
  assignList: any;
  count: any;
  userid: any;
  dummassignList: any;
  currentUrl: any; 
  roleid : any
  todaydate:any;
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);

    this.userid = sessionStorage.getItem('userid');
    this.roleid = sessionStorage.getItem('roleid');
    this.GetEnroll();
  }

  public GetEnroll() {
  
    this.LearningService.GetEnroll().subscribe({
      next: (data) => {
        debugger;
        // this.result = data.filter(x => x.manager == this.manager );
        // this.result = data.filter(x => x.status == 'Manager Assigned' );
        if(this.roleid==3){
          this.assignList = data.filter(
            (x) => x.type == 'Manager Assign' && x.manager == this.userid
          );
        }
        else{
          this.assignList = data.filter(
            (x) => x.staffID == this.userid
          );
        }
        
        this.dummassignList = this.assignList;
        this.count = this.assignList.length;
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

  public Ondelete(ID: any) {
    Swal.fire({
      title: 'Are You Sure ',
      text: 'Do you want to delete the Selected Record',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.value == true) {
        this.LearningService.DeleteEnroll(ID).subscribe({
          next: (data) => {
            debugger;
            this.GetEnroll();
          },
         error: (err: { error: { message: any; }; }) => {
            Swal.fire('Issue in DeleteEnroll');
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
        Swal.fire('Successfully Deleted...!');
        this.ngOnInit();
      }
    });
  }

  edit(ID: any) {
    debugger;
    location.href = '#/AssignCourseToEmployee/' + ID;
  }

  public filterAssignTraining() {
    debugger;
    let searchCopy = this.search.toLowerCase();
    this.assignList = this.dummassignList.filter(
      (x: { employeeName: string }) =>
        x.employeeName.toLowerCase().includes(searchCopy)
    );
    this.count = this.assignList.length;
    // location.reload();
  }

  fileName = 'Learning Path Reports.xlsx';
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
