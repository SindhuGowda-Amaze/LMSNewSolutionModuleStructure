import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-dashboard',
  templateUrl: './category-dashboard.component.html',
  styleUrls: ['./category-dashboard.component.css'],
})
export class CategoryDashboardComponent implements OnInit {
  currentUrl: any;
  search: any;
  id: any;
  result: any;
  count: any;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private LearningService: LearningService
  ) {}

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.GetCategoryMaster();
    this.ActivatedRoute.params.subscribe((params) => {
      debugger;
      this.id = params['id'];
      if (this.id != null && this.id != undefined) {
        this.GetCategoryMaster();
      }
    });
  }

  public GetCategoryMaster() {
    debugger;
    this.LearningService.GetCategoryMaster().subscribe({
      next: (data) => {
        debugger;
        this.result = data;
        this.count = this.result.length;
      },
     error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting CategoryMaster');
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

  public Ondelete(id: any) {
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
        this.LearningService.DeleteCategoryMaster(id)
        .subscribe({
          next: (data) => {
            debugger;
            this.GetCategoryMaster();
          },
         error: (err: { error: { message: any; }; }) => {
            Swal.fire('Issue in Getting DeleteCategoryMaster');
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
}
