import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-dashboard',
  templateUrl: './category-dashboard.component.html',
  styleUrls: ['./category-dashboard.component.css']
})
export class CategoryDashboardComponent implements OnInit {

  constructor(private ActivatedRoute: ActivatedRoute, private LearningService: LearningService) { }

  search: any;
  id: any;
  result: any;
  count: any;

  ngOnInit(): void {
    this.GetCategoryMaster();
    this.ActivatedRoute.params.subscribe(params => {
      debugger
      this.id = params["id"];
      if (this.id != null && this.id != undefined) {
        this.GetCategoryMaster();
      }
    })
  }

  public GetCategoryMaster() {
    debugger
    this.LearningService.GetCategoryMaster().subscribe(
      data => {
        debugger
        this.result = data;
        this.count = this.result.length;
      })
  }

  public Ondelete(id:any) {
    Swal.fire({
      title: 'Are You Sure ',
      text: "Do you want to delete the Selected Record",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.value == true) {
        this.LearningService.DeleteCategoryMaster(id).subscribe(
      data => {
        debugger
        this.GetCategoryMaster();
      }
    )
    Swal.fire('Successfully Deleted...!');
    this.ngOnInit();
      }
    });
  }

}
