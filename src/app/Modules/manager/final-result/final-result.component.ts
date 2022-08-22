import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-final-result',
  templateUrl: './final-result.component.html',
  styleUrls: ['./final-result.component.css'],
})
export class FinalResultComponent implements OnInit {
  constructor(private LearningService: LearningService) {}
  search: any;
  roleid: any;
  userid: any;
  Marks: any;
  currentUrl: any;
  ngOnInit(): void {
    this.currentUrl = window.location.href;
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

  name:any;
  percentage:any;
  courseName:any;
  issueDate:any;
  public GetTestResponsenew() {
    debugger;
    this.LearningService.GetTestResponsenew()
    .subscribe({
      next: (data) => {
        debugger;
        if (this.roleid == 4) {
          this.Marks = data.filter((x) => x.trainerID == this.userid);
          this.name=this.Marks[0].staffname
          this.courseName=this.Marks[0].coursename
          this.percentage=this.Marks[0].obtainedMarks
          this.issueDate=this.Marks[0].modifiedDate
          this
        } else {
          this.Marks = data;
        }
      },
     error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in GetTestResponsenew');
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
  certificateid:any
  public getcertificate(id:any){
this.certificateid=id
    this.LearningService.GetTestResponsenew()
    .subscribe({
      next: (data) => {
        debugger;
    
          this.Marks = data.filter((x) => x.id == this.certificateid);
          this.name=this.Marks[0].staffname
          this.courseName=this.Marks[0].coursename
          this.percentage=this.Marks[0].obtainedMarks
          this.issueDate=this.Marks[0].modifiedDate
          this
        
      },
     error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in GetTestResponsenew');
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


  fileName = 'Final Result Reports.xlsx';
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

  dummassignList: any;
  assignList: any;
  count: any;
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

}
