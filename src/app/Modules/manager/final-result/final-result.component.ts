import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-final-result',
  templateUrl: './final-result.component.html',
  styleUrls: ['./final-result.component.css'],
})
export class FinalResultComponent implements OnInit {
  constructor(private LearningService: LearningService) {}
  search: any;
  roleid: any;
  userid: any;
  Marks: any;
  currentUrl: any;
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.roleid = sessionStorage.getItem('roleid');
    this.userid = sessionStorage.getItem('userid');
    this.GetTestResponsenew();
  }

  // Marks:any;
  // public GetTestResponse() {
  //   debugger
  //   this.LearningService.GetTestResponse().subscribe(
  //     data => {
  //       debugger
  //       this.Marks = data;
  //     })
  // }

  public GetTestResponsenew() {
    debugger;
    this.LearningService.GetTestResponsenew()
    .subscribe({
      next: (data) => {
        debugger;
        if (this.roleid == 4) {
          this.Marks = data.filter((x) => x.trainerID == this.userid);
        } else {
          this.Marks = data;
        }
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
}
