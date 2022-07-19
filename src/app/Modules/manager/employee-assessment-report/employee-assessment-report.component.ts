import { Component, OnInit } from '@angular/core';

import { LearningService } from 'src/app/Pages/Services/learning.service';
import { ActivatedRoute } from '@angular/router';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-employee-assessment-report',
  templateUrl: './employee-assessment-report.component.html',
  styleUrls: ['./employee-assessment-report.component.css']
})
export class EmployeeAssessmentReportComponent implements OnInit {

  constructor(private LearningService:LearningService,private ActivatedRoute:ActivatedRoute ) { }
  userid:any;
  ngOnInit(): void {
    this.userid = sessionStorage.getItem('userid');
    this.GetTrainerReport();
    this.GetDepartmentMaster();
  }
  search:any;
  dummemployeereportlist: any;
  traininglist: any;
  employeereportlist: any;
  courseid: any;
  count: any;
  departmentid: any;
  dumdeptlist: any
  departmentlist: any;
  courseID:any;
  courselist:any;
  TrainerID:any;
  trainerlist:any;

   public GetTrainerReport(){
     debugger
     this.LearningService.GetTrainerReport(0,0).subscribe(data=>{
       this.employeereportlist=data.filter(x=>x.staffID==this.userid);
       this.dummemployeereportlist=data;
       this.traininglist=data;
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
        this.employeereportlist = this.dummemployeereportlist.filter((x: { courseName: any; }) => x.courseName == this.courseid)
        this.count = this.employeereportlist.length;
      }
      else{
        this.GetTrainerReport();
      }
    }

    getCourseID(even:any)
    {
      debugger
      this.courseID=even.target.value;
    }

    getTrainerID(even:any)
    {
      debugger
      this.TrainerID=even.target.value;
    }
    public GetTrainer() {
      debugger
      this.LearningService.GetTrainer().subscribe(
        data => {
          debugger
          this.trainerlist = data;
        })
    }

}

