import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assign-course-dashboard',
  templateUrl: './assign-course-dashboard.component.html',
  styleUrls: ['./assign-course-dashboard.component.css'],
})
export class AssignCourseDashboardComponent implements OnInit {
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private LearningService: LearningService
  ) {}

  search: any;
  id: any;
  assignList: any;
  count: any;
  userid: any;
  dummassignList: any;
  currentUrl: any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.GetEnroll();
    this.userid = sessionStorage.getItem('userid');
  }

  public GetEnroll() {
    this.LearningService.GetEnroll().subscribe({
      next: (data) => {
        debugger;
        // this.result = data.filter(x => x.manager == this.manager );
        // this.result = data.filter(x => x.status == 'Manager Assigned' );
        this.assignList = data.filter(
          (x) => x.type == 'Manager Assign' && x.manager == this.userid && x.mappingHidden==0
        );
        this.dummassignList = this.assignList;
        this.count = this.assignList.length;
      },
     error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in GetEnroll');
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

  public Ondelete(ID: any) {
    Swal.fire({
      title: 'Are You Sure ',
      text: 'Do you want to delete the Selected Record',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.value == true) {
        this.LearningService.DeleteEnroll(ID).subscribe({
          next: (data) => {
            debugger;
            this.GetEnroll();
          },
         error: (err: { error: { message: any; }; }) => {
            Swal.fire('Issue in DeleteEnroll');
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
        Swal.fire('Successfully Deleted...!');
        this.ngOnInit();
      }
    });
  }

  edit(ID: any) {
    debugger;
    location.href = '#/Manager/AssignCourseToEmployee/' + ID;
  }

  public filterAssignTraining() {
    debugger;
    let searchCopy = this.search.toLowerCase();
    this.assignList = this.dummassignList.filter(
      (x: { employeeName: string }) =>
        x.employeeName.toLowerCase().includes(searchCopy)
    );
    this.count = this.assignList.length;
    // location.reload();
  }
}
