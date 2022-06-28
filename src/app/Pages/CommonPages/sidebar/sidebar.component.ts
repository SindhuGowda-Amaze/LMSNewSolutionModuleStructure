import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  roleid: any;
  UserName: any;
  company_name: any;
  role: any;


  temp: any;
  show: any;
  ngOnInit(): void {
    this.temp = sessionStorage.getItem('temp')
    this.roleid = sessionStorage.getItem('roleid');
    this.company_name = sessionStorage.getItem("company_name");
    this.UserName = sessionStorage.getItem('UserName');
    this.role = sessionStorage.getItem('role')
  }



  public highlight(evt: any) {
    debugger
    var i, tablinks;
    //  sessionStorage.setItem("clickname",name)
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    evt.currentTarget.className += " active";
  }

  active: any;
  Dashboard() {
    this.active = 2;
    sessionStorage.setItem("clickname", "Dashboard")
  }

  chapterdashboard() {
    this.active = 'Topic';
    sessionStorage.setItem("clickname", "Topic  Dashboard")
  }

  assessments() {
    this.active = 'Assessments';
    sessionStorage.setItem("clickname", "Assessments")
  }

  setup() {
    this.active = 'setup'
    sessionStorage.setItem("clickname", "SETUP")
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

  mycourse() {
    this.active = 'mycourse';
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
  myassessmentreport() {
    this.active = 'myassessmentreport';
    sessionStorage.setItem("clickname", "MY ASSESSMENT REPORT")
  }
  attendence() {
    this.active = 'MyATTENDANCE';
    sessionStorage.setItem("clickname", "ATTENDANCE")
  }
  catalog() {
    this.active = 'catalogue';
    sessionStorage.setItem("clickname", "CATALOG")
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

  help() {
    this.active = 'help'
    sessionStorage.setItem("clickname", "HELP")
  }

  SupportTickets() {
    this.active = 'SupportTickets'
    sessionStorage.setItem("clickname", "support tickets")
  }

}