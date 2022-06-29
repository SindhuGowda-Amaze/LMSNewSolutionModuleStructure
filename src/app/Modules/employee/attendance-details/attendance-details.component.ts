import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { LearningService } from 'src/app/Pages/Services/learning.service';
@Component({
  selector: 'app-attendance-details',
  templateUrl: './attendance-details.component.html',
  styleUrls: ['./attendance-details.component.css']
})
export class AttendanceDetailsComponent implements OnInit {

  shiftdetails:any;
  data:any;
  constructor(private LearningService:LearningService,private AcivatedRoute:ActivatedRoute, private datePipe: DatePipe) { }
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};

  roleid: any
  staffID: any;
  myDate: any;
  ngOnInit(): void {




    this.myDate = new Date();

    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
   
  //   this.GetAttendance();
  //   this.LearningService.GetMyDetails().subscribe((data: any) => {
  //     debugger
  //     this.dropdownList = data;
  //   })

  //   this.dropdownSettings = {
  //     singleSelection: true,
  //     idField: 'id',
  //     textField: 'name',
  //     selectAllText: 'Select All',
  //     unSelectAllText: 'UnSelect All',
  //     itemsShowLimit: 10,
  //     allowSearchFilter: true,

  //   };
  // }
  // employeeid: any
  // onItemSelect(item: any) {
  //   debugger
  //   console.log(item);
  //   this.employeeid = item.id;
  //   this.LearningService.GetAttendance().subscribe(data => {
  //     debugger
  //     this.attendancelist = data.filter(x => x.userID == this.employeeid && (x.filterdate >= this.startdate && x.filterdate <= this.enddate))
  //   })

  // }

  // UserID: any;
  // SigninDate: any;
  // SigninLocation: any;
  // StatusID: any;
  // public punchin() {

  //   var entity = {


  //     UserID: sessionStorage.getItem('staffid'),
  //     SigninDate: this.datePipe.transform((new Date), 'MM/dd/yyyy h:mm:ss'),
  //     SigninLocation: 'Office',
  //     StatusID: this.StatusID

  //   }
  //   this.LearningService.InsertAttendanceWeb(entity).subscribe(data => {
  //     if (data != 0) {
  //       this.punchinId = data
  //       sessionStorage.setItem('PunchINid', this.punchinId)
  //       Swal.fire('Punched In Succesfully')
  //     }

  //   })

  // }

  // punchinId: any;
  // public punchout() {

  //   var entity = {


  //     ID: sessionStorage.getItem('PunchINid'),
  //     SignoutDate: this.datePipe.transform((new Date), 'MM/dd/yyyy h:mm:ss'),
  //     SignoutLocation: 'Office',
  //     StatusID: this.StatusID

  //   }
  //   this.LearningService.UpdateAttendanceWeb(entity).subscribe(data => {
  //     if (data != 0) {
  //       Swal.fire('Punched Out Succesfully')
  //     }

  //   })

  // }



  // startdate: any;
  // enddate: any;
  // attendancelist: any;
  // public getenddate(event: any) {
  //   debugger
  //   this.LearningService.GetAttendance().subscribe(data => {
  //     debugger
  //     this.attendancelist = data.filter(x => x.supervisor == sessionStorage.getItem('staffid') && (x.filterdate >= this.startdate && x.filterdate <= this.enddate))
  //   })
  // }

  // public GetAttendance() {
  //   debugger
  //   this.LearningService.GetAttendance().subscribe(data => {
  //     debugger
  //     this.attendancelist = data;
  //   })
  // }
  // selecallbtn: any
  // selectALL(checked: boolean) { // pass true or false to check or uncheck all
  //   this.selecallbtn = true;
  //   var inputs = document.getElementsByTagName("input");
  //   for (var i = 0; i < inputs.length; i++) {
  //     if (inputs[i].type == "checkbox") {
  //       inputs[i].checked = checked;
  //       // This way it won't flip flop them and will set them all to the same value which is passed into the function
  //     }
  //   }
  // }


  }

}
