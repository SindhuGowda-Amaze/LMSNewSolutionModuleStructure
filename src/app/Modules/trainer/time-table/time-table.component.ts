import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import { FullCalendarOptions, EventObject } from 'ngx-fullcalendar';
import { DatePipe, formatDate } from '@angular/common';
@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit {

 
  constructor(public DigiofficeService: LearningService, public router: Router, public datePipe: DatePipe) { }
  public showorhidecontent: any;
  options: FullCalendarOptions | undefined;
  events: EventObject[] | undefined;
  roleid: any;
  viewMode = 'tab1';
  IntID: boolean = false;
  public ID: any = [];
  temp: any
  staffleaves2: any;
  staffleaves3: any;
  Notes: any
  public selectedlanguage: any;
  public selectedlanguage1: any;
  public callenderyear: any;
  public callenderMonth: any;
  public callenderstartday: any;
  public callenderendday: any;
  public callenderdaysdount: any = [];
  public callenderBindData = new Date();
  public todaydate = new Date().getDate();
  public options1: any;
  public todayDay = this.datePipe.transform(new Date().getDay(), 'EEEE');
  public selecallbtn: any;
  staffID: any;
  filtereddate: any;
  firstDayofcurrentmonth: any;
  roledid: any;
  currentUrl: any;
  term: any;
  staffleaves: any;
  staffleaves1: any;
  date: any;
  id: any;
  edate: any;
  sdte: any;

  medicalUrl: any
  public alldates: any = [];

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.selecallbtn = false;
    this.roledid = localStorage.getItem('roledid');
    this.staffID = localStorage.getItem('staffid');
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.filtereddate = formatDate(myDate, format, locale);
    this.todaydate = this.filtereddate;
    debugger
    this.firstDayofcurrentmonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    this.firstDayofcurrentmonth = formatDate(this.firstDayofcurrentmonth, format, locale);
    this.getstaffleaves(this.staffID, this.firstDayofcurrentmonth, '01-01-2029');
  }

  public getstaffleaves(staffID: any, SDate: any, EDate: any) {
    debugger
 

  

  }

  selectALL(event: any) {
    this.ID = [];
    // pass true or false to check or uncheck all
    if (event.target.checked == true) {

      this.selecallbtn = true;

      var inputs = document.getElementsByTagName("input");

      for (var i = 0; i < inputs.length; i++) {

        if (inputs[i].type == "checkbox") {

          inputs[i].checked = event.currentTarget.checked;

          // This way it won't flip flop them and will set them all to the same value which is passed into the function

        }

      }

    }
    else {
      this.selecallbtn = false;
      var inputs = document.getElementsByTagName("input");
      for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "checkbox") {
          inputs[i].checked = false;

        
          // This way it won't flip flop them and will set them all to the same value which is passed into the function
        }
      }
      // for (var i = 0; i < this.staffleaves1.length; i++) {
      //   var obj: any = {};
      //   obj["id"] = this.staffleaves1[i].id;
      //   obj["staffID"] = this.staffleaves1[i].staffID;
      //   obj["leaveTypeID"] = this.staffleaves1[i].leaveTypeID;
      //   obj["noOfDays"] = this.staffleaves1[i].noOfDays;
      //   this.ID.push(obj);
      // }

    }
  
  }

  public Approveall() {
    debugger
    for (var i = 0; i < this.ID.length; i++) {
      var entity = {
        'ID': this.ID[i].id,
        'Status1': 'Manager Approved',
        'UserID': this.ID[i].staffID,
        'LeaveTypeID': this.ID[i].leaveTypeID,
        'NoOfDays': this.ID[i].noOfDays
      }
   
    }


  }

  public ManagerLeaveApprove(id: any) {
    debugger
    var entity = {
      'ID': id.id,
      'Status1': 'Manager Approved',
      'StaffName': id.staffID,
      'LeaveTypeID': id.leaveTypeID,
      'NoOfDays': id.noOfDays,

    }

  }
  leavename: any;
  public InsertNotificationforapproval(supervisor: any) {
    debugger
    var entity = {
      'Date': new Date(),
      'Event': 'Leave Request',
      'FromUser': 'Admin',
      'ToUser': localStorage.getItem('staffid'),
      'Message': 'Your Leave Request has been Approved !!',
      'Photo': 'Null',
      'Building': 'Dynamics 1',
      'UserID': supervisor,
      'NotificationTypeID': 3,
      'VendorID': 0
    }
    this.DigiofficeService.InsertNotification(entity)
      .subscribe({
        next: data => {
          debugger
          if (data != 0) {


          }
        }, error: (err) => {
          Swal.fire('Issue in Inserting Notification');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
  }

  public getdate() {
    debugger
    this.getstaffleaves(this.staffID, this.date, this.edate)
  }

  public ManagerLeaveDecline() {
    debugger
    var entity = {
      'ID': this.id,
      'LeaveReason': 'Rejected',
      'Status1': 'Rejected',
      'StartDate': this.sdte,
      'EndDate': this.edate,
    }
  
  }
  public InsertNotificationforReject(supervisor: any) {
    debugger
    var entity = {
      'Date': new Date(),
      'Event': 'Leave Request',
      'FromUser': 'Admin',
      'ToUser': localStorage.getItem('staffid'),
      'Message': 'Your Leave Request has been Approved !!',
      'Photo': 'Null',
      'Building': 'Dynamics 1',
      'UserID': supervisor,
      'NotificationTypeID': 3,
      'VendorID': 0
    }
    this.DigiofficeService.InsertNotification(entity)
      .subscribe({
        next: data => {
          debugger
          location.reload();
          if (data != 0) {



          }
        }, error: (err) => {
          Swal.fire('Issue in Inserting Notification');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
  }

  public GetRejectID(list: any) {
    this.id = list.id;
    this.sdte = list.sdte;
    this.edate = list.edate;
    this.staffID = list.staffID
  }

  public getmedicalUrl(medicalUrl: any) {
    debugger
    this.medicalUrl = medicalUrl
  }

  public getCheckbocdetails(evn: any) {
    let temp: any = evn;
    this.temp = Object.entries(temp);
    debugger
    if (this.temp.every((val: { checked: boolean; }) => val.checked == true)) {
      this.IntID = false;
      this.ID = [];
      this.temp.forEach((val: { checked: boolean; }) => { val.checked = false });
      this.IntID = false;
    }
    else {
      debugger;
      this.selecallbtn = true;
      //  this.ID = [];
      debugger
      this.temp.forEach((val: { checked: boolean; }) => { val.checked = true });
      this.IntID = true;
      var obj: any = {};
      obj["id"] = evn.id;
      obj["staffID"] = evn.staffID;
      obj["leaveTypeID"] = evn.leaveTypeID;
      obj["noOfDays"] = evn.noOfDays;
      this.ID.push(obj);
    }
  }

  changeStatus(evn: any) {
    if (evn.target.value == 1) {
      this.showorhidecontent = true;
    }
    else {
      this.showorhidecontent = false;
    }
  }

  public buildcallender(MaintainanceList: string | any[]) {
    debugger
    this.callenderdaysdount.length = 0;
    this.callenderyear = this.callenderBindData.getFullYear();
    this.callenderMonth = this.datePipe.transform(this.callenderBindData, 'MMMM');
    this.callenderstartday = new Date(this.callenderBindData.getFullYear(), this.callenderBindData.getMonth(), 1);
    this.callenderendday = new Date(this.callenderBindData.getFullYear(), this.callenderBindData.getMonth() + 1, 0);
    this.callenderdaysdount.length = this.callenderendday.getDate();
    let o = 0;
    for (let i = 0; i < this.callenderdaysdount.length; i++) {
      let sdate = this.callenderstartday;
      let _date;
      if (sdate.getDate() == 1 && o == 0) {
        _date = sdate.setDate(sdate.getDate() + 0);
        o++
      }
      else {
        _date = sdate.setDate(sdate.getDate() + 1);
      }
      _date = this.datePipe.transform(sdate, 'dd');
      let _day = this.datePipe.transform(sdate, 'EEE');
      let dateformat = this.datePipe.transform(sdate, 'yyyy-MM-ddTHH:mm:ss');
      this.callenderdaysdount[i] = { date: _date, day: _day, dateformat: dateformat };
    }
    //Events Binding
    const getDatesBetweenDates = (startDate: string | number | Date, endDate: string | number | Date) => {
      let dates: any = []
      //to avoid modifying the original date
      const theDate = new Date(startDate)
      while (theDate < new Date(endDate)) {
        dates = [...dates, new Date(theDate)]
        theDate.setDate(theDate.getDate() + 1)
      }
      dates = [...dates, new Date(endDate)]
      this.alldates = dates;
      return dates
    }
    for (let j = 0; j < MaintainanceList.length; j++) {
      debugger;
      getDatesBetweenDates(MaintainanceList[j].filterdate, MaintainanceList[j].filterdate1)
      for (let k = 0; k < this.alldates.length; k++) {
        let currenteventlist = this.callenderdaysdount.filter((x: { dateformat: number; }) => (this.datePipe.transform(x.dateformat, 'yyyy-MM-dd') == this.datePipe.transform(this.alldates[k], 'yyyy-MM-dd')))
        if (currenteventlist.length > 0) {
          this.callenderdaysdount[currenteventlist[0].date - 1]['RequestFor'] = MaintainanceList[j].requestFor;
          this.callenderdaysdount[currenteventlist[0].date - 1]['StartTime'] = MaintainanceList[j].startTime;
          this.callenderdaysdount[currenteventlist[0].date - 1]['EndTime'] = MaintainanceList[j].endTime;
          this.callenderdaysdount[currenteventlist[0].date - 1]['mantainenceHtml'] =
            this.callenderdaysdount[currenteventlist[0].date - 1]['mantainenceHtml'] =
            // "<span class='event_PendingBookCommunity'> Leave ID : " + MaintainanceList[j].id +
            "<br>  Staff Name  :" + MaintainanceList[j].staffName + " <br> "
          // "<br>  Reason : " + MaintainanceList[j].leaveReason +
          "</span>";
        }
      }
    }
  }

  changeStatus1() {
    debugger;
    this.showorhidecontent = true;
  }

  public ShowMaintenanceRequest(evn: any) {
    debugger;
    var html = evn.srcElement.innerText.split(': ');
    var s1 = html[1].substring(0, html[1].indexOf('\n'));
    let MaintenanceRequest = this.staffleaves.filter((x: { id: string; }) => x.id == s1);
    // Swal.fire(({
    //   title: '<strong><u>Leave Details</u></strong>',
    //   type: 'info',
    //   html:
    //     '<p style="font-size: 24px;text-align: start;margin-left: 135px;"> Staff Name : ' + MaintenanceRequest[0].staffName +
    //     '       <br>' +
    //     'Leave Reason: ' + MaintenanceRequest[0].leaveReason +
    //     '       <br>' +
    //     'Start Date: ' + MaintenanceRequest[0].sDateOfLeave +
    //     '       <br>' +
    //     'End Date: ' + MaintenanceRequest[0].eDateOfLeave +
    //     '       <br>' +
    //     '</p>'
    //   ,
    //   showCloseButton: true,
    //   showCancelButton: false,
    //   focusConfirm: true,
    // }));
  }

  public previousmonth() {
    debugger;
    this.callenderBindData.setMonth(this.callenderBindData.getMonth() - 1);
    this.buildcallender(this.staffleaves);
  }

  public nextmonth() {
    debugger;
    this.callenderBindData.setMonth(this.callenderBindData.getMonth() + 1);
    this.buildcallender(this.staffleaves);
  }

}