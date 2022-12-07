import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-attendance-new',
  templateUrl: './attendance-new.component.html',
  styleUrls: ['./attendance-new.component.css']
})
export class AttendanceNewComponent implements OnInit {
  search: any;
  id: any;
  result: any;
  count: any;
  roleid: any;
  userid: any;
  userName: any;
  Attendance: any;
  currentUrl:any;
  employeeID:any;
  trainer:any;
  courseID: any;
  TopicID:any;
  Today:any;
  noofhrs:any;
  constructor(private ActivatedRoute: ActivatedRoute, private LearningService: LearningService) { }

  ngOnInit(): void {
    this.Course="0"
    this.courseID="0"
    this.TopicID="0"
    this.currentUrl = window.location.href;
    this.roleid = sessionStorage.getItem('roleid');
    this.userid = sessionStorage.getItem('userid');
    this.userName = sessionStorage.getItem('UserName');

    this.Today = new Date().toISOString().split("T")[0];

this.GetCourseDropdown();
this.getTopic();
    this.GetAttendance_New();
    // this.areYouReallySure = false;
    // this.allowPrompt = true;

  }
  



  public GetAttendance_New() {
    debugger
    this.LearningService.GetAttendance_New()
    .subscribe({
      next: data => {
        debugger
        if(this.roleid==4){
          this.Attendance = data.filter(x => x.trainerID == this.userid && x.filterdate==this.Today);
          // this.Attendance = data
        }
        else if(this.roleid==3){
          this.Attendance = data.filter(x => x.supervisor == this.userid  && x.filterdate==this.Today);
        }
        else{
          this.Attendance = data.filter(x=>x.empID==this.userid  && x.filterdate==this.Today)
        }
      },error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in GetAttendance_New');
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


  endDate: any;
  uniquelist: any;
  Date: any;
  filterbydate() {
    this.LearningService.GetTestResponse().subscribe({
      next: (data) => {
        this.uniquelist = data.filter(
          (x) => x.startDate >= this.Date && x.endDate <= this.endDate
        );

        const key = 'coursename';
        this.uniquelist = [
          ...new Map(
            this.uniquelist.map((item: { [x: string]: any }) => [
              item[key],
              item,
            ])
          ).values(),
        ];
      },
    });
  }
  courseid: any;
  dummyuniqlist: any;
  employeereportlist:any;
  getcourseid(even: any) {
    debugger;
    this.courseid = even.target.value;
    if (even.target.value != 0) {
      this.uniquelist = this.dummyuniqlist.filter(
        (x: { coursename: any }) => x.coursename == this.courseid
      );

      this.count = this.employeereportlist.length;
    } else {
      this.GetTrainerReport();
    }
  }
  dummemployeereportlist:any;
  employeeFilterReportList:any;
  Course:any;
  public GetTrainerReport() {
    debugger;
    this.LearningService.GetTestResponse().subscribe({
      next: (data) => {
        debugger;
        this.employeereportlist = data.filter((x) => x.userID == this.userid);

        const key = 'coursename';
        this.uniquelist = [
          ...new Map(
            this.employeereportlist.map((item: { [x: string]: any }) => [
              item[key],
              item,
            ])
          ).values(),
        ];
        this.dummyuniqlist = this.uniquelist;
        this.dummemployeereportlist = data;
        this.employeeFilterReportList = this.employeereportlist;
        this.count = this.employeereportlist.length;
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in GetTestResponse');
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
courseList  :any;
  public GetCourseDropdown() {
    this.LearningService.GetCourseDropdown().subscribe({
      next: (data) => {
        debugger;
        this.courseList = data;
      },
      error: (err: { error: { message: any } }) => {
        Swal.fire('Issue in GetCourseDropdown');
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


  getCourseID(even: any) {
    debugger;
    this.courseID = even.target.value;
  }



  TopicList:any
  public getTopic() {
    debugger;
    this.LearningService.GetChapter().subscribe((data) => {
      debugger;
      this.TopicList = data;
    });
  }

  fileName = 'Attendance Reports.xlsx';
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
