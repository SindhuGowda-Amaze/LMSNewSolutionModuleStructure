import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import { ActivatedRoute } from '@angular/router';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trainee-report',
  templateUrl: './trainee-report.component.html',
  styleUrls: ['./trainee-report.component.css'],
})
export class TraineeReportComponent implements OnInit {
  userid: any;
  search: any;
  dummemployeereportlist: any;
  traininglist: any;
  employeereportlist: any;
  courseid: any;
  count: any;
  departmentid: any;
  dumdeptlist: any;
  departmentlist: any;
  roleid: any;
  date: any;
  currentUrl: any;
  Date: any;
  constructor(
    private LearningService: LearningService,
    private ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.roleid = sessionStorage.getItem('roleid');
    this.userid = sessionStorage.getItem('userid');
    this.GetTrainerReport();
    this.GetDepartmentMaster();
  }

  public GetTrainerReport() {
    debugger;
    this.LearningService.GetTrainerReport(0, 0).subscribe({
      next: (data) => {
        // this.employeereportlist=data.filter(x=>x.trainerID==this.userid);
        if (this.roleid == 4) {
          this.employeereportlist = data.filter((x) => x.completed == 1);
        } else {
          this.employeereportlist = data;
        }

        this.dummemployeereportlist = data;
        this.traininglist = data;
      },
     error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in GetTrainerReport');
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

  fileName = 'Approved Applicants Reports.xlsx';
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

  public GetDepartmentMaster() {
    debugger;
    this.LearningService.GetDepartmentMaster()
    .subscribe({
      next: (data) => {
        debugger;
        this.departmentlist = data;
        this.count = this.departmentlist.length;
        console.log('this.departmentlist.length', this.count);
      },
     error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in GetDepartmentMaster');
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

  getdepartmentid(even: any) {
    debugger;
    this.departmentid = even.target.value;
    if (even.target.value != 0) {
      this.employeereportlist = this.dummemployeereportlist.filter(
        (x: { departmentID: any }) => x.departmentID == this.departmentid
      );
    } else {
      this.GetTrainerReport();
    }
  }

  getcourseid(even: any) {
    debugger;
    this.courseid = even.target.value;
    if (even.target.value != 0) {
      this.employeereportlist = this.dummemployeereportlist.filter(
        (x: { courseName: any }) => x.courseName == this.courseid
      );
      this.count = this.employeereportlist.length;
    } else {
      this.GetTrainerReport();
    }
  }
  
  endDate: any;
  uniquelist: any;
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

}
