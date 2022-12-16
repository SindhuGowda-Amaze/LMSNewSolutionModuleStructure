import { Component, HostListener } from '@angular/core';

import { LearningService } from 'src/app/Pages/Services/learning.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LMSNewSolutionModuleStructure';
  temp: any;
  // @HostListener('window:beforeunload', ['$event'])
  // beforeunloadHandler(event: { preventDefault: () => void; returnValue: string; }) {
  //   debugger
  //   event.preventDefault();
  //   event.returnValue = 'Your data will be lost!';
  //   return false;
  // }
  
  staffID: any;
  roleid:any; 
  constructor(private LearningService: LearningService) { }
  ngOnInit() {
  
    this.temp = sessionStorage.getItem('temp');
    this.staffID = sessionStorage.getItem('userid');
    this.roleid = sessionStorage.getItem('roleid');

    window.addEventListener('beforeunload', function (e) {
      e.preventDefault();
      e.returnValue = '';
  });
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
  loginid1: any;
  public async insertattdancelogout() {
    debugger
    this.LearningService.GetAttendance_New().subscribe(data => {
      debugger
      var todayDate = new Date().toISOString().slice(0, 10);
      let temp: any = data.filter(x => x.empID == sessionStorage.getItem('userid') && x.filterdate === todayDate);
      if (temp.length == 0) {
        //  Swal.fire('Not Logged In Correctly today'); 
      } else {
        this.loginid1 = temp[0].id;
      }
    });
    var entity = {
      'loginid': this.loginid1,
      'EmpID': this.staffID,
      'LogoutDate': new Date()
    }
    this.LearningService.UpdateAttendance_New(entity).subscribe(
      data => {
        debugger
        if (data != 0) {
          sessionStorage.clear();
          sessionStorage.clear();
          location.href = "#/Login";
          location.reload();
        }
      })
  }


}
