import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  company_name: any;
  temp: any
  roleid: any;
  role: any;
  UserName: any;
  page: any;
  time: any;
  hh: any;
  mm: any;
  ampm: any;
  loginid: any;
  staffID: any;
  myname: any;

  constructor(private LearningService: LearningService, public router: Router) { }
  ngOnInit(): void {
    this.temp = sessionStorage.getItem('temp');
    this.loginid = sessionStorage.getItem('loginid');
    this.staffID = sessionStorage.getItem('userid');

    this.roleid = sessionStorage.getItem('roleid');
    this.company_name = sessionStorage.getItem("company_name");
    this.UserName = sessionStorage.getItem('UserName');
    this.role = sessionStorage.getItem('role')


    setInterval(() => {
      var time = new Date();
      this.time = time.toLocaleString('en-US', { hour: '2-digit', minute: 'numeric', hour12: true });
      let temp: any = this.time.split(':');
      this.hh = temp[0];
      let temp1: any = this.time.split(':')[1].split(" ");
      this.mm = temp1[0];
      this.ampm = temp1[1];
    }, 1000);

    interval(1000).subscribe((x => {
      this.page = sessionStorage.getItem('clickname')
    }));




    if (this.roleid == 1) {
      this.initail = 'A'
    }
    else if (this.roleid == 4) {
      this.LearningService.GetTrainer().subscribe(res => {
        debugger
        let temp: any = res.filter(x => x.id == this.staffID);
        this.myname = temp[0].name;
        this.initail = this.myname.charAt(0);
      });
    }
    else {
      this.LearningService.GetMyDetails().subscribe(res => {
        debugger
        let temp: any = res.filter(x => x.id == this.staffID);
        this.myname = temp[0].name;
        this.initail = this.myname.charAt(0);
      });
    }


  }

  async logout() {
    debugger
    if (this.roleid == 2) {
      this.insertattdancelogout();
    }
    else {
      sessionStorage.clear();
      sessionStorage.clear();
      location.href = "#/Login";
      location.reload();
    }

  }

  public async insertattdancelogout() {
    debugger

    this.LearningService.GetAttendance_New().subscribe(data => {
      debugger
      var todayDate = new Date().toISOString().slice(0, 10);
      let temp: any = data.filter(x => x.empID == sessionStorage.getItem('userid') && x.filterdate === todayDate);
      if (temp.length == 0) {
        Swal.fire('Not Logged In Correctly today'); 
      } else {
        this.loginid = temp[0].id;

        var entity = {
          'loginid': this.loginid,
          'LogoutDate': new Date()
        }

        this.LearningService.UpdateAttendance_New(entity).subscribe(
          data => {
            debugger
            if (data == 0) {
              sessionStorage.clear();
              sessionStorage.clear();
              location.href = "#/Login";
              location.reload();
            }
          })
      }


    });

  }




  initail: any
  notificationslist: any

  public GetNotification() {
    debugger

    this.LearningService.GetNotification(this.staffID).subscribe(data => {
      debugger
      this.notificationslist = data;
    })
  }

  public ClearNotification() {
    debugger
    this.LearningService.ClearNotificationByID(Number(this.staffID)).subscribe(data => {
      debugger

    })

    Swal.fire('Cleared Successfully');
    this.GetNotification();

  }


  public accountsetting() {
    debugger
    this.router.navigate(['/Shared/MyAccountSetting']);
  }


  public onActivate(event: any) {
    window.scroll(0, 0);
  }








}