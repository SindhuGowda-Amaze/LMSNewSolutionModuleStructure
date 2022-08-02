import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-accountsetting-modify',
  templateUrl: './my-accountsetting-modify.component.html',
  styleUrls: ['./my-accountsetting-modify.component.css'],
})
export class MyAccountsettingModifyComponent implements OnInit {
  confirmpassword: any;
  newpassword: any;
  Currentpassword: any;
  Currentpwd: any;
  pwd: any;
  roleid: any;
  curpassvaild: any;
  currentUrl: any;
  passvaild: any;

  constructor(public LearningService: LearningService, public router: Router) {}

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.roleid = sessionStorage.getItem('roleid');
    this.passvaild = true;
    this.curpassvaild = true;
  }

  public checkcurpassword(event: any) {
    debugger;
    this.Currentpwd = event.target.value;
    this.LearningService.GetMyDetails()
    .subscribe({
      next: (data) => {
        debugger;
        let temp: any = data.filter(
          (x) => x.id == sessionStorage.getItem('userid')
        );
        this.Currentpassword = temp[0].password;
      },
      error: (err) => {
        Swal.fire('Issue in GetMyDetails');
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
    if (this.Currentpassword === this.Currentpwd) {
      this.curpassvaild = true;
    } else {
      this.curpassvaild = false;
    }
  }
  public checkpassword(event: any) {
    debugger;
    this.confirmpassword = event.target.value;

    if (this.newpassword === this.confirmpassword) {
      this.passvaild = true;
    } else {
      this.passvaild = false;
    }
  }

  public Updatepassword() {
    debugger;
    if (
      this.newpassword == undefined ||
      this.newpassword == null ||
      this.newpassword == '' ||
      this.confirmpassword == undefined ||
      this.confirmpassword == null ||
      this.confirmpassword == ''
    ) {
      Swal.fire('Please fill Mandatory Fields');
    } else {
      var entity = {
        ID: sessionStorage.getItem('userid'),
        Password: this.confirmpassword,
      };
      if (this.roleid == 4) {
        this.LearningService.UpdateTrainerPassword(entity)
        .subscribe({
          next: (data) => {
            debugger;
            Swal.fire('Updated Successfully');
            this.Currentpassword = '';
            this.newpassword = '';
            this.confirmpassword = '';
            this.ngOnInit();
          },
          error: (err) => {
            Swal.fire('Issue in UpdateTrainerPassword');
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
      } else {
        this.LearningService.UpdatePassword(entity).subscribe({
          next: (data) => {
            Swal.fire('Updated Successfully');
            this.Currentpassword = '';
            this.newpassword = '';
            this.confirmpassword = '';
            this.ngOnInit();
          },
          error: (err) => {
            Swal.fire('Issue in UpdatePassword');
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
  }

  public Cancel() {
    debugger;
    location.href = '#/MyAccountSetting';
  }
}
