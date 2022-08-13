import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.css']
})
export class ViewGroupComponent implements OnInit {

  constructor(public DigiofficeService: LearningService, public router: Router) { }
  stafflist: any;
  Search: any;
  leavelist: any;
  Department: any;
  Citylist: any;
  CityID: any;
  count: any;
  SubsidaryList: any;
  loader: any;
  currentUrl: any;
  Subsidiary: any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.Department = 0;
    this.Subsidiary = 0
    this.CityID = 0;
    this.loader = true;
    this.GetAllStaffNew();
    this.GetSubsidaryMaster();
    this.GetDepartmentMaster();
    this.GetCityType();
  }

  public GetAllStaffNew() {
    this.DigiofficeService.GetAllStaffNew()
      .subscribe({
        next: data => {
          debugger
          this.stafflist = data.filter(x => x.id != localStorage.getItem('staffid'));
          this.count == this.stafflist.length;
          this.loader = false;
        }, error: (err) => {
          Swal.fire('Issue in Getting All New Staff');
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

  public GetSubsidaryMaster() {
    this.DigiofficeService.GetSubsidaryMaster()
      .subscribe({
        next: data => {
          debugger
          this.SubsidaryList = data;
          this.loader=false;
        }, error: (err) => {
          Swal.fire('Issue in Getting Subsidiary Master');
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

  public GetDepartmentMaster() {
    this.DigiofficeService.GetDepartmentMaster()
      .subscribe({
        next: data => {
          debugger
          this.leavelist = data;
          this.loader=false;
        }, error: (err) => {
          Swal.fire('Issue in Getting Department Master');
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

  public GetCityType() {
    this.DigiofficeService.GetCityType()
      .subscribe({
        next: data => {
          debugger
          this.Citylist = data;
          this.loader=false;
        }, error: (err) => {
          Swal.fire('Issue in Getting City Type');
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

  public getAssignedCompany() {
  }

  public getstaffid(item: any) {
    debugger
    this.router.navigate(['/Employee/Chat', item.id]);
    this.loader=false;
  }

}