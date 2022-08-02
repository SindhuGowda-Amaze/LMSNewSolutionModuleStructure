import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-support-tickets-form',
  templateUrl: './support-tickets-form.component.html',
  styleUrls: ['./support-tickets-form.component.css']
})
export class SupportTicketsFormComponent implements OnInit {

  constructor(public LearningService: LearningService,public ActivatedRoute: ActivatedRoute,public datepipe:DatePipe) { }
  todaydate:any
  date: any;
  time: any;
  typeofissue: any;
  prority: any;
  screenShot:any=[]
  comments: any;
  status: any;
  companyname: any;
  applicationName: any;
  id:any;
  staffID:any;
  ticketlist: any;
  files: File[] = [];
  files1: File[] = [];

  ngOnInit(): void {
    this.staffID = sessionStorage.getItem('userid');
    this.typeofissue="0";
    this.prority="0"
    const format = 'dd-MM-yyyy';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = new Date().toISOString().split("T")[0];
    this.date=this.todaydate
    // this.todaydate = formatDate(myDate, format, locale);
    this.GetSupportTickets();
    this.ActivatedRoute.params.subscribe(params => {
      debugger
      this.id = params["id"];
      if (this.id != null && this.id != undefined) {
        this.GetSupportTickets();
      }
    })
  }


  public GetSupportTickets() {
    this.LearningService.GetSupportTickets().subscribe(
      data => {
        this.ticketlist = data.filter(x => x.applicationName == 'DigiLearning and Management' && x.id==this.id);
        this.date = this.datepipe.transform(this.ticketlist[0].date, 'yyyy-MM-dd');
          this.time = this.ticketlist[0].time1,
          this.typeofissue = this.ticketlist[0].typeOfApplicationIssues,
          this.prority = this.ticketlist[0].priority,
          this.screenShot[0] = this.ticketlist[0].screenShot,
          this.comments = this.ticketlist[0].comment
      }
    )
  }


 
  onSelect(event: { addedFiles: any; }) {
    debugger
    console.log(event);
    this.files.push(event.addedFiles[0]);
    this.files1.push(event.addedFiles[0]);

    console.log("content", this.files);
    this.AttachmentsUpload()
  }


  AttachmentsUpload() {
    this.LearningService.AttachmentsUploadsss(this.files).subscribe(data => {
      debugger
      this.screenShot.push(data);
      console.log( "data",this.screenShot);
      this.files.length=0;
    })
  }

  onRemove(event: any) {
    debugger
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  save() {
    debugger
    if(this.date==undefined||this.date==""||this.date==null||this.time==0||this.time==undefined
    ||this.time==""||this.time==null||this.typeofissue==undefined||this.typeofissue==""||
    this.typeofissue==null||this.typeofissue==0||this.prority==null||this.prority==undefined||
    this.prority==""||this.prority==0||this.screenShot==undefined||this.screenShot==""||
    this.screenShot==null||this.screenShot==0||this.comments==undefined||this.comments==""||this.comments==null){
      Swal.fire("Please Enter the Mandatory Fields");
    }
    else{
    debugger
    var entity = {
      "Date": this.date,
      "Time": this.time,
      "TypeOfApplicationIssues": this.typeofissue,
      "Priority": this.prority,
      "ScreenShot": this.screenShot[0],
      "Comment": this.comments,
      "Status": 'Raised',
      "Companyname": 'Amazeinc.in',
      "ApplicationName": 'DigiLearning and Management',
       "StaffID":this.staffID
    }
    
    this.LearningService.InsertSupportTickets(entity).subscribe(
      data => {
        this.ticketid = data;
        this.uploadmultipleimages()
        Swal.fire("Saved Sucessfully");
        location.href="/Shared/SupportTicketsDashboard";

        this.date='';
        this.time='';
        this.typeofissue='';
        this.prority='';
        this.comments='';

      }
    )
  }
  }

  ticketid: any
  public uploadmultipleimages() {
      debugger
    for (let i = 0; i<this.screenShot.length; i++) {
      var entity = {
        "Attachment": this.screenShot[i],
        "TicketID": this.ticketid,
      }
      this.LearningService.InsertAttachment(entity).subscribe(
        data => {
          Swal.fire("Updated Successfully");

        }
      )
    }
  }

  Update() {
    debugger
    var entity = {
      "id": this.id,
      "Date": this.date,
      "Time": this.time,
      "TypeOfApplicationIssues": this.typeofissue,
      "Priority": this.prority,
      "ScreenShot": this.screenShot[0],
      "Comment": this.comments,
      "Status": 'Open',
      "Companyname": 'Amazeinc.in',
      "ApplicationName": 'DigiLearning and Management',
      "StaffID":this.staffID
    }
    this.LearningService.UpdateSupportTickets(entity).subscribe(
      data => {
        this.ticketid = data;
        this.uploadmultipleimages()
        Swal.fire("Updated Sucessfully");
        location.href = "/Shared/SupportTicketsDashboard";

        this.date = '';
        this.time = '';
        this.typeofissue = '';
        this.prority = '';
        this.comments = '';

      }
    )
  }

  public cancel(){
    location.href="/Shared/SupportTicketsDashboard";
  }
}


