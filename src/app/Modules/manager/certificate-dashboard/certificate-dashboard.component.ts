import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import { ActivatedRoute } from '@angular/router';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-certificate-dashboard',
  templateUrl: './certificate-dashboard.component.html',
  styleUrls: ['./certificate-dashboard.component.css'],
})
export class CertificateDashboardComponent implements OnInit {
  dummyuniqlist: any;
  constructor(
    private LearningService: LearningService,
    private ActivatedRoute: ActivatedRoute
  ) {}

  viewMode = 'tab1';
  userid: any;
  courseList: any;
  search: any;
  dummemployeereportlist: any;
  traininglist: any;
  employeereportlist: any;
  courseid: any;
  count: any;
  departmentid: any;
  dumdeptlist: any;
  departmentlist: any;
  date: any;
  Course: any;
  coursename: any;
  employeeFilterReportList: any;
  currentUrl: any;
  uniquelist1:any;
  roleid:any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.userid = sessionStorage.getItem('userid');
    this.roleid=sessionStorage.getItem('roleid');
    this.GetTrainerReport();
    this.GetDepartmentMaster();
    this.GetCourseDropdown();
    this.Course = 0;
    this.GetCertification();
  }

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

  uniquelist: any;
  Date: any;

  public GetTrainerReport() {
    debugger;
    if(this.roleid==2){
      this.LearningService.GetTestResponse().subscribe({
        next: (data) => {
          debugger;
          this.employeereportlist = data.filter((x) => x.userID == this.userid && x.completed==1);
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
    else if(this.roleid==4){
      this.LearningService.GetTestResponse().subscribe({
        next: (data) => {
          debugger;
          this.employeereportlist = data.filter((x) => x.trainerID == this.userid && x.completed==1);
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
    else{
      this.LearningService.GetTestResponse().subscribe({
        next: (data) => {
          debugger;
          this.employeereportlist = data.filter((x) =>x.completed==1);
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
  


  }


  fileName = 'Certificate Reports.xlsx';
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
  }


  public GetDepartmentMaster() {
    debugger;
    this.LearningService.GetDepartmentMaster().subscribe({
      next: (data) => {
        debugger;
        this.departmentlist = data;
      },
      error: (err: { error: { message: any } }) => {
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
      this.uniquelist = this.dummyuniqlist.filter(
        (x: { coursename: any }) => x.coursename == this.courseid
      );

      this.count = this.employeereportlist.length;
    } else {
      this.GetTrainerReport();
    }
  }

  public filterNameOfCerticate() {
    debugger;
    let searchCopy = this.search.toLowerCase();
    this.employeereportlist = this.employeeFilterReportList.filter(
      (x: { coursename: string; chaptername: string; trainer: string }) =>
        x.coursename.toLowerCase().includes(searchCopy) ||
        x.chaptername.toLowerCase().includes(searchCopy) ||
        x.trainer.toLowerCase().includes(searchCopy)
    );
    this.count = this.employeereportlist.length;
  }
  endDate: any;
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

  Staff:any;
  view(staffname: any, coursename: any) {
    this.Staff = staffname;
    this.Course = coursename;
  }
  
  download() {
    this.convetToPDF1();
  }
  public convetToPDF1() {
    debugger;

    var data: any = document.getElementById('downloadaplication');
    html2canvas(data)
      .then((canvas) => {
        var margin = 5;
        var imgWidth = 208;
        // var pageHeight = 295 - 10 * margin;
        var pageHeight = 295;
        var imgHeight = (canvas.height * imgWidth) / canvas.width;
        var heightLeft = imgHeight;
        var doc = new jsPDF('p', 'mm');
        var position = 0;
        while (heightLeft > 0) {
          const contentDataURL = canvas.toDataURL('image/png');
          position = heightLeft - imgHeight;

          doc.addPage();
          doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        doc.deletePage(1);
        doc.save('ER-2 Report.pdf');

        var pdf1 = doc.output('blob');
        var file = new File([pdf1], 'Application.pdf');
        let body = new FormData();
        debugger;
        body.append('Dan', file);
        console.log('pdf', pdf1);
      })
      .then(() => {});
  }

  CertificatList:any;

  GetCertification() {
    this.LearningService.GetCertification().subscribe({
      next: (data) => {
        debugger;
        this.CertificatList = data.filter(x=>x.employeeID==this.userid)
      },
      error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in GetCourse');
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

}
