import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/Pages/Services/learning.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-support-tickets-dash',
  templateUrl: './support-tickets-dash.component.html',
  styleUrls: ['./support-tickets-dash.component.css'],
})
export class SupportTicketsDashComponent implements OnInit {
  constructor(public LearningService: LearningService) {}

  ticketlist: any;
  search: any;
  count: any;
  staffID: any;
  attachmentlist: any;
  currentUrl: any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.staffID = sessionStorage.getItem('userid');
    this.GetSupportTickets();
  }

  public GetSupportTickets() {
    debugger;
    this.LearningService.GetSupportTickets()
    .subscribe({
      next: (data) => {
        debugger;
        this.ticketlist = data.filter(
          (x) =>
            x.applicationName == 'DigiLearning and Management' &&
            x.staffID == this.staffID
        );
        this.count = this.ticketlist.length;
      },
     error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in GetSupportTickets');
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

  image(id: any) {
    debugger;
    this.LearningService.GetSupportAttachment()
    .subscribe({
      next: (data) => {
        debugger;
        this.attachmentlist = data.filter((x) => x.ticketID == id);
      },
     error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in GetSupportAttachment');
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

  public DeleteSupportTickets(ID: any) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want to delete it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value == true) {
        this.LearningService.DeleteSupportTickets(ID).subscribe({
          next: (data) => {
            debugger;
            Swal.fire('Deleted Successfully');
            location.reload();
          },
         error: (err: { error: { message: any; }; }) => {
            Swal.fire('Issue in DeleteSupportTickets');
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
    });
  }
}
