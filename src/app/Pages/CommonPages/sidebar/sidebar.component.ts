import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public router: Router) { }

  roleid: any;
  UserName: any;
  company_name: any;
  role: any;
  userid:any;
  loginid:any;
  temp: any;
  show: any;
  ngOnInit(): void {
    this.temp = sessionStorage.getItem('temp')
    this.loginid = sessionStorage.getItem('loginid');
    this.userid = sessionStorage.getItem('userid');
    this.roleid = sessionStorage.getItem('roleid');
    this.company_name = sessionStorage.getItem("company_name");
    this.UserName = sessionStorage.getItem('UserName');
    this.role = sessionStorage.getItem('role')
  }



  public highlight(evt: any) {

   
    var i, tablinks;
    //  sessionStorage.setItem("clickname",name)
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    evt.currentTarget.className += " active";
    this.active = 'mycourse1';
  }

  active: any;
  Dashboard() {
    this.active = 2;
    sessionStorage.setItem("clickname", "Dashboard")
  }

  chapterdashboard() {
    this.active = 'Chapter';
    sessionStorage.setItem("clickname", "Topic  Dashboard")
  }

  assessments() {
    this.active = 'Assessments';
    sessionStorage.setItem("clickname", "Assessments")
  }

  setup() {
    this.active = 'setup'
    sessionStorage.setItem("clickname", "CONTENT")
  }
  report() {
    this.active = 'report'
    sessionStorage.setItem("clickname", "REPORT")
  }

  category() {
    this.active = 'category';
    sessionStorage.setItem("clickname", "CATEGORY")
  }

  course() {
    this.active = 'course'
    sessionStorage.setItem("clickname", "TRAINING")
  }

  chapter() {
    this.active = 'chapter'
    sessionStorage.setItem("clickname", "TOPIC")
  }

  trainer() {
    this.active = 'trainer'
    sessionStorage.setItem("clickname", "TRAINER")
  }

  assigntrainer() {
    this.active = 11;
    sessionStorage.setItem("clickname", "ASSIGN TRAINER")
  }

  employee() {
    this.active = 'employee'
    sessionStorage.setItem("clickname", "EMPLOYEE")
  }

  MyCourse() {
    this.active = 'mycourse1';
    sessionStorage.setItem("clickname", "MY TRAINING")
  }
  mycertificate() {
    this.active = 'mycertificate';
    sessionStorage.setItem("clickname", "MY CERTIFICATE")
  }
  myemployeereport() {
    this.active = 'myemployeereport';
    sessionStorage.setItem("clickname", "EMPLOYEE REPORT")
  }
  mylearningpath() {
    this.active = 'mylearningpath';
    sessionStorage.setItem("clickname", "LEARNING PATH")
  }
  myassessmentreport() {
    this.active = 'myassessmentreport';
    sessionStorage.setItem("clickname", "MY ASSESSMENT")
  }
  attendence() {
    this.active = 'MyATTENDANCE';
    sessionStorage.setItem("clickname", "ATTENDANCE")
  }

  mytraininghrsreport() {
    this.active = 'mytraininghrsreport';
    sessionStorage.setItem("clickname", "TRAINING HOURS")
  }

  catalog() {
    this.active = 'catalogue';
    sessionStorage.setItem("clickname", "CATALOG")
  }

  enrolledtraining() {
    this.active = 'enrolledtraining';
    sessionStorage.setItem("clickname", "ENROLLED TRAINING")
  }

  enrolledtrainingpip() {
    this.active = 'pip';
    sessionStorage.setItem("clickname", "ENROLLED TRAINING")
  }

  certificate() {
    sessionStorage.setItem("clickname", "CERTIFICATE")
  }

  assigncourse() {
    this.active = 'ASSIGNCourse';
    sessionStorage.setItem("clickname", "ASSIGN TRAINING")
  }

  results() {
    this.active = 'result';
    sessionStorage.setItem("clickname", "RESULTS")
  }

  testsubmit() {
    this.active = 'submitest';
    sessionStorage.setItem("clickname", "Test Submitted")
  }

  employeeAssessment(){
    this.active='employeeAssessment';
    sessionStorage.setItem("clickname", "Employee Assessment")
  }


  Assessmentresult(){
    this.active='assessmentresult';
    sessionStorage.setItem("clickname", "Employee Assessment Result")
  }

  TraineeReport(){
    this.active='traineeReport';
    sessionStorage.setItem("clickname", "Trainee Report")
  }

  timetable() {
    this.active = 'timetable'
    sessionStorage.setItem("clickname", "timetable")
  }
  LearningHistory() {
    this.active = 'History'
    sessionStorage.setItem("clickname", "timetable")
  }

  help() {
    this.active = 'help'
    sessionStorage.setItem("clickname", "HELP")
  }

  SupportTickets() {
    this.active = 'SupportTickets'
    sessionStorage.setItem("clickname", "support tickets")
  }

  // chat: any
  public Chat() {
    debugger
    this.active = 22;
    // localStorage.setItem('clickname', 'CHAT')
    sessionStorage.setItem("clickname", "CHAT")
    this.router.navigate(['/Employee/ViewGroup']);

  }

}