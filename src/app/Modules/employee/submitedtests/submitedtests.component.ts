import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-submitedtests',
  templateUrl: './submitedtests.component.html',
  styleUrls: ['./submitedtests.component.css'],
})
export class SubmitedtestsComponent implements OnInit {
  staffid: any;
  search: any;
  date: any;
  count: any;
  resultemployee: any;
  result: any;
  currentUrl: any;
  constructor(public LearningService: LearningService) {}

  ngOnInit(): void {
    this.currentUrl = window.location.href;

    this.staffid = sessionStorage.getItem('userid');
    this.GetTestResponsenew();
  }

  GetTestResponsenew() {
    this.LearningService.GetTestResponsenew()
    .subscribe({
      next: (data) => {
        debugger;
        this.result = data.filter((x) => x.checked == 1);
        this.resultemployee = this.result;
        this.count = this.result.length;
      },
     error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in GetTestResponsenew');
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

  public getdate(even: any) {
    debugger;
    this.date = even.target.value;

    this.filterdate();
  }

  public filterdate() {
    debugger;
    this.LearningService.GetTestResponsenew()
    .subscribe({
      next: (data) => {
        debugger;
        this.result = data.filter(
          (x) => x.checked == 1 && x.modifiedDate == this.date
        );
        this.count = this.result.length;
      },
     error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in GetTestResponsenew');
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

  public filterSubmittedEmployee() {
    debugger;
    let searchCopy = this.search.toLowerCase();
    this.result = this.resultemployee.filter(
      (x: {
        staffname: string;
        coursename: string;
        chaptername: string;
        emailID: string;
      }) =>
        x.staffname.toLowerCase().includes(searchCopy) ||
        x.coursename.toLowerCase().includes(searchCopy) ||
        x.chaptername.toLowerCase().includes(searchCopy) ||
        x.emailID.toLowerCase().includes(searchCopy)
    );

    this.count = this.result.length;
    // location.reload();
  }
}
