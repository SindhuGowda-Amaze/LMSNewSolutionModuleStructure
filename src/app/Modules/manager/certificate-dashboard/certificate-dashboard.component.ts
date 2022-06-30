import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import { ActivatedRoute } from '@angular/router';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-certificate-dashboard',
  templateUrl: './certificate-dashboard.component.html',
  styleUrls: ['./certificate-dashboard.component.css']
})
export class CertificateDashboardComponent implements OnInit {

  constructor(private LearningService:LearningService,private ActivatedRoute:ActivatedRoute ) { }
  userid:any
  courseList:any;
  search:any;
  dummemployeereportlist: any;
  traininglist: any;
  employeereportlist: any;
  courseid: any;
  count: any;
  departmentid: any;
  dumdeptlist: any
  departmentlist: any;
  date:any;
  employeeFilterReportList:any;

  ngOnInit(): void {
    this.userid = sessionStorage.getItem('userid');
    this.GetTrainerReport();
    this.GetDepartmentMaster();
    this.LearningService.GetCourseDropdown().subscribe(
      data => {
        debugger
        this.courseList = data;
      })
  }

   public GetTrainerReport(){
     debugger
     this.LearningService.GetTestResponse().subscribe(data=>{
       this.employeereportlist=data.filter(x=>x.userID== this.userid )
       this.dummemployeereportlist=data;
       this.employeeFilterReportList = this.employeereportlist;
       this.count = this.employeereportlist.length;
     }
      )
   }


   fileName = 'Approved Applicants Reports.xlsx';
   exportexcel(): void {
     /* table id is passed over here */
     let element = document.getElementById('download');
     debugger
     const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
     debugger
 
     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

     /* save to file */
     XLSX.writeFile(wb, this.fileName);
 
   }

  public GetDepartmentMaster(){
    debugger
    this.LearningService.GetDepartmentMaster().subscribe(
      data => {
        debugger
        this.departmentlist = data;
      })
  }

  getdepartmentid(even:any){
    debugger
    this.departmentid = even.target.value;
    if (even.target.value != 0) {
      this.employeereportlist = this.dummemployeereportlist.filter((x: { departmentID: any; }) => x.departmentID == this.departmentid)
    }
    else{
      this.GetTrainerReport();
    }
  }
  
    getcourseid(even:any){
      debugger
      this.courseid=even.target.value;
      if(even.target.value !=0){
        this.employeereportlist = this.dummemployeereportlist.filter((x: { courseID: any; userID:any;}) => x.courseID == this.courseid && x.userID== this.userid )
        this.count = this.employeereportlist.length;
      }
      else{
        this.GetTrainerReport();
      }
    }

    public filterNameOfCerticate() {
      debugger
      let searchCopy = this.search.toLowerCase();
      this.employeereportlist = this.employeeFilterReportList.filter((x: { coursename: string , chaptername:
      string , trainer: string }) => 
      (x.coursename.toLowerCase().includes(searchCopy)) || (x.chaptername.toLowerCase().includes(searchCopy)) 
      || (x.trainer.toLowerCase().includes(searchCopy)));
      this.count = this.employeereportlist.length;
    }
    





}

