import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit {

  constructor(private ActivatedRoute: ActivatedRoute, private LearningService: LearningService) { }
  search: any;
  id: any;
  result: any;
  currentUrl:any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;

    this.GetTrainer();
    this.ActivatedRoute.params.subscribe(params => {
      debugger
      this.id = params["id"];
      if (this.id != null && this.id != undefined) {
        this.GetTrainer();
      }
    })
  }

  public GetTrainer() {
    debugger
    this.LearningService.GetTrainer()
    .subscribe({
      next: data => {
        debugger
        this.result = data;
      },error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in GetTrainer');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.LearningService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
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
    this.LearningService.DeleteTrainer(id)
    
    .subscribe({
      next: data => {
        debugger
        this.GetTrainer();
      },error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in DeleteTrainer');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.LearningService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
  
    Swal.fire('Successfully Deleted...!');
    this.ngOnInit();
      }
    })
  }

  OpenPdf(pdf:any)
  {
    window.open(pdf,"_blank")
  }

}

