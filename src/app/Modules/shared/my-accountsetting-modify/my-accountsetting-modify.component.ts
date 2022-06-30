import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-accountsetting-modify',
  templateUrl: './my-accountsetting-modify.component.html',
  styleUrls: ['./my-accountsetting-modify.component.css']
})
export class MyAccountsettingModifyComponent implements OnInit {

  constructor(public LearningService: LearningService, public router: Router) { }
  confirmpassword: any;
  newpassword: any;
  Currentpassword: any;
  Currentpwd:any;
  pwd:any;
  roleid:any;

  ngOnInit(): void {
    this.roleid = sessionStorage.getItem('roleid');
    this.passvaild = true;
    this.curpassvaild = true;
   

  }
  
  curpassvaild: any;
   public checkcurpassword(event: any) {
    debugger
    this.Currentpwd = event.target.value;
    this.LearningService.GetMyDetails().subscribe(data => {
      debugger
      let temp: any = data.filter(x => x.id == sessionStorage.getItem('userid'));
       this.Currentpassword = temp[0].password;

    });
    if (this.Currentpassword === this.Currentpwd) {
      this.curpassvaild = true;
    } else {
      this.curpassvaild = false;
    }

  }


  passvaild: any;
  public checkpassword(event: any) {
    debugger
    this.confirmpassword = event.target.value;

    if (this.newpassword === this.confirmpassword) {
      this.passvaild = true;
    } else {
      this.passvaild = false;
    }

  }

  public Updatepassword() {
    debugger
    if (this.newpassword == undefined || this.newpassword == null || this.newpassword == '' || this.confirmpassword == undefined || this.confirmpassword == null || this.confirmpassword == '') {
      Swal.fire("Please fill Mandatory Fields");
    } else {
      var entity = {

        ID: sessionStorage.getItem('userid'),
        Password: this.confirmpassword,
      }
      if(this.roleid==4){
        this.LearningService.UpdateTrainerPassword(entity).subscribe(data => {
          Swal.fire("Updated Successfully");
          this.Currentpassword='';
          this.newpassword = '';
          this.confirmpassword = ''
          this.ngOnInit();
        })
      }
      else{
        this.LearningService.UpdatePassword(entity).subscribe(data => {
          Swal.fire("Updated Successfully");
          this.Currentpassword='';
          this.newpassword = '';
          this.confirmpassword = ''
          this.ngOnInit();
        })
      
      }
     
    }



  }

  public Cancel() {
    debugger
    location.href = "#/MyAccountSetting";
    
  }

}
