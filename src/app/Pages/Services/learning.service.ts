
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
// import { environment } from "../environments/environment";
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
@Injectable({
  providedIn: 'root'
})
export class LearningService {
 

  public baseURL = "https://103.12.1.103/LearningandDevelopmentdemo";
public host = "https://103.12.1.103/DigiOfficeCoreHRAPI"

   // public baseURL = "http://localhost:4199/";
  //  public baseURL = "http://23.101.22.93/LearningandDevelopmentdemo/";
   // public host1 = "https://digioffice.amazeone.co/digiofficeapi";
 //  public host = "https://23.101.22.93//DigiOfficeCoreHRAPI"

  // public baseURL = "https://103.12.1.103/LearningandDevelopmentdemo";
 
   //public host = "https://103.12.1.103/DigiOfficeCoreHRAPI"
   
  //  public host1="https://support.amazeone.co/SupportAPI/";
 
  public host1=" https://asticom.digiofficeapp.com/SupportAPI/"
 
   url: any;
   constructor(private http: HttpClient) {
    //  console.log("environment", environment.hostUrl);
   }
 
   public GetLoginTypeMaster() {
 
     return this.http.get<any[]>(this.host + "/Vendor/GetLoginTypeMaster");
   }
 
 
   public GetRecruiterStaff() {
 
     return this.http.get<any[]>(this.host + "/User/GetRecruiterStaff");
   }
   public AttachmentsUpload(files: any) {
     debugger
     let formdata: FormData = new FormData();
     for (let i = 0; i < files.length; i++) {
       formdata.append('file_upload', files[i], files[i].name);
     }
     debugger
     let APIURL = this.baseURL + "/Master/UploadImages/";
     return this.http.post(APIURL, formdata);
   }
   public GetRoleType() {
     return this.http.get<any[]>(
       this.host + "/MasterDemo/GetRoleType?UserTypeID=" + 1
     );
   }
 
   public GetMyDetails() {
     return this.http.get<any[]>(
       this.host + "/Announcement/GetMyDetails"
     );
   }
 
   // public GetMyDetails() {
   //   debugger
   //   let APIURL = this.baseURL + "Master/GetMyDetails";
   //   return this.http.get<any[]>(APIURL);
   // }
 
 
   public DeleteMyDetails(id: any) {
     debugger
     let APIURL = this.baseURL + "Master/DeleteMyDetails?ID=" + id;
     return this.http.get<any[]>(APIURL);
   }
 
   public GetPositionDetails() {
     return this.http.get<any[]>(
       this.host + "/Master/GetPositionDetails"
     );
   }
   public GetMyAddressDetails() {
     return this.http.get<any[]>(
       this.host + "/Master/GetMyAddressDetails"
     );
   }
   public GetDependentDetails() {
     return this.http.get<any[]>(
       this.host + "/Master/GetDependentDetails"
     );
   }
 
   public GetNomination() {
     return this.http.get<any[]>(
       this.host + "/Master/GetNomination"
     );
   }
   public GetEmploymentDetails() {
     return this.http.get<any[]>(
       this.host + "/Master/GetEmploymentDetails"
     );
   }
   public GetEducationDetails() {
     return this.http.get<any[]>(
       this.host + "/Master/GetEducationDetails"
     );
   }
   public GetBankDetails() {
     return this.http.get<any[]>(
       this.host + "/Master/GetBankDetails"
     );
   }
 
   public GetID_Details() {
     return this.http.get<any[]>(
       this.host + "/Master/GetID_Details"
     );
   }
 
 
   public GetVisaDetails() {
     return this.http.get<any[]>(
       this.host + "/Master/GetVisaDetails"
     );
   }
 
   public GetSalaryDetails() {
     return this.http.get<any[]>(
       this.host + "/Master/GetSalaryDetails"
     );
   }
 
   public InsertMyDetails(data: any) {
     debugger;
     this.url = this.host + '/Building/InsertBuildingStaff';
     return this.http.post(this.url, data);
   }
 
   public UpdateStaff(data: any) {
     debugger;
     this.url = this.host + '/Building/UpdateBuildingStaff';
     return this.http.post(this.url, data);
   }
 
   public InsertDependentDetails(data: any) {
     debugger;
     this.url = this.host + '/Master/InsertDependentDetails';
     return this.http.post(this.url, data);
   }
   public InsertNomination(data: any) {
     debugger;
     this.url = this.host + '/Master/InsertNomination';
     return this.http.post(this.url, data);
   }
 
   public InsertMyAddressDetails(data: any) {
     debugger;
     this.url = this.host + '/Master/InsertMyAddressDetails';
     return this.http.post(this.url, data);
   }
 
   public InsertEmploymentDetails(data: any) {
     debugger;
     this.url = this.host + '/Master/InsertEmploymentDetails';
     return this.http.post(this.url, data);
   }
 
   public InsertEducationDetails(data: any) {
     debugger;
     this.url = this.host + '/Master/InsertEducationDetails';
     return this.http.post(this.url, data);
   }
 
   public InsertID_Details(data: any) {
     debugger;
     this.url = this.host + '/Master/InsertID_Details';
     return this.http.post(this.url, data);
   }
 
   public InsertBankDetails(data: any) {
     debugger;
     this.url = this.host + '/Master/InsertBankDetails';
     return this.http.post(this.url, data);
   }
 
 
   public InsertVisaDetails(data: any) {
     debugger;
     this.url = this.host + '/Master/InsertVisaDetails';
     return this.http.post(this.url, data);
   }
 
   public InsertSalaryDetails(data: any) {
     debugger;
     this.url = this.host + '/Master/InsertSalaryDetails';
     return this.http.post(this.url, data);
   }
 
 
   public InsertPositionDetails(data: any) {
     debugger;
     this.url = this.host + '/Master/InsertPositionDetails';
     return this.http.post(this.url, data);
   }
 
 
   public UpdatePositionDetails(data: any) {
     debugger;
     this.url = this.host + '/Master/UpdatePositionDetails';
     return this.http.post(this.url, data);
   }
 
   public UpdateEmploymentDetails(data: any) {
     debugger;
     this.url = this.host + '/Master/UpdateEmploymentDetails';
     return this.http.post(this.url, data);
   }
 
 
   public UpdateEducationDetails(data: any) {
     debugger;
     this.url = this.host + '/Master/UpdateEducationDetails';
     return this.http.post(this.url, data);
   }
 
 
   public UpdateMyDetails(data: any) {
     debugger;
     this.url = this.host + '/Master/UpdateMyDetails';
     return this.http.post(this.url, data);
   }
 
 
   public UpdateSalaryDetails(data: any) {
     debugger;
     this.url = this.host + '/Master/UpdateSalaryDetails';
     return this.http.post(this.url, data);
   }
 
 
   public UpdateBankDetails(data: any) {
     debugger;
     this.url = this.host + '/Master/UpdateBankDetails';
     return this.http.post(this.url, data);
   }
 
 
   public UpdateVisaDetails(data: any) {
     debugger;
     this.url = this.host + '/Master/UpdateVisaDetails';
     return this.http.post(this.url, data);
   }
 
 
   public UpdateID_Details(data: any) {
     debugger;
     this.url = this.host + '/Master/UpdateID_Details';
     return this.http.post(this.url, data);
   }
 
 
   public UpdateNomination(data: any) {
     debugger;
     this.url = this.host + '/Master/UpdateNomination';
     return this.http.post(this.url, data);
   }
 
   public UpdateDependentDetails(data: any) {
     debugger;
     this.url = this.host + '/Master/UpdateDependentDetails';
     return this.http.post(this.url, data);
   }
 
   public UpdateMyAddressDetails(data: any) {
     debugger;
     this.url = this.host + '/Master/UpdateMyAddressDetails';
     return this.http.post(this.url, data);
   }
 
   public GetAttendance() {
     return this.http.get<any[]>(
       this.host + "/MobileUser/GetAttendance?UserID=1&SDate=01-01-2020&EDate=01-01-2020"
     );
   }
 
   public InsertAttendanceWeb(data: any) {
     debugger;
     this.url = this.host + '/MobileUser/InsertAttendanceWeb';
     return this.http.post(this.url, data);
   }
 
   public UpdateAttendanceWeb(data: any) {
     debugger;
     this.url = this.host + '/MobileUser/UpdateAttendanceWeb';
     return this.http.post(this.url, data);
   }
 
   public GetCourse() {
     debugger;
     return this.http.get<any[]>(
       this.baseURL + '/Master/GetCourse');
   }
 
   public GetUnmappedCourseDropdown() {
     debugger;
     return this.http.get<any[]>(
       this.baseURL + '/Master/GetUnmappedCourseDropdown');
   }
   
   public InsertCourse(data: any) {
     debugger;
     this.url = this.baseURL + '/Master/InsertCourse';
     return this.http.post(this.url, data);
   }
 
   public UpdateCourse(data: any) {
     debugger;
     this.url = this.baseURL + '/Master/UpdateCourse';
     return this.http.post(this.url, data);
   }
 
   public DeleteCourse(ID: any) {
     return this.http.get<any[]>(
       this.baseURL + "/Master/DeleteCourse?ID=" + ID);
   }
 
   public GetCategoryMaster() {
     debugger;
     return this.http.get<any[]>(
       this.baseURL + '/Master/GetCategoryMaster');
   }
 
   public InsertCategoryMaster(json: any) {
     debugger
     let APIURL = this.baseURL + "/Master/InsertCategoryMaster";
     return this.http.post<any[]>(APIURL, json);
   }
 
   public UpdateCategoryMaster(json: any) {
     debugger
     let APIURL = this.baseURL + "/Master/UpdateCategoryMaster";
     return this.http.post<any[]>(APIURL, json);
   }
 
   public DeleteCategoryMaster(id: any) {
     debugger
     let APIURL = this.baseURL + "/Master/DeleteCategoryMaster?ID=" + id;
     return this.http.get<any[]>(APIURL);
   }
 
   public GetQuestionMaster() {
     debugger
     let APIURL = this.baseURL + "/Master/GetQuestionMaster";
     return this.http.get<any[]>(APIURL);
   }
 
 
 
   public GetTrainerCourseMapping() {
     debugger
    
     return this.http.get<any[]>(
      this.baseURL + '/Master/GetTrainerCourseMapping');
   }

 
 
   public GetEmployee() {
     debugger
     let APIURL = this.baseURL + "/Master/GetEmployee";
     return this.http.get<any[]>(APIURL);
   }
 
   public GetTrainer() {
     debugger
     let APIURL = this.baseURL + "/Master/GetTrainer";
     return this.http.get<any[]>(APIURL);
   }
 
   public GetBatch() {
     debugger
     let APIURL = this.baseURL + "/Master/GetBatch";
     return this.http.get<any[]>(APIURL);
   }
 
   public InsertTrainer(json: any) {
     debugger
     let APIURL = this.baseURL + "/Master/InsertTrainer";
     return this.http.post<any[]>(APIURL, json);
   }
 
   public UpdateTrainer(json: any) {
     debugger
     let APIURL = this.baseURL + "/Master/UpdateTrainer";
     return this.http.post<any[]>(APIURL, json);
   }
 
   public DeleteTrainer(id: any) {
     debugger
     let APIURL = this.baseURL + "/Master/DeleteTrainer?ID=" + id;
     return this.http.get<any[]>(APIURL);
   }
 
 
   public GetAssessments() {
     debugger
     let APIURL = this.baseURL + "/Master/GetAssessments";
     return this.http.get<any[]>(APIURL);
   }
 
   public InsertAssessments(json: any) {
     debugger
     let APIURL = this.baseURL + "/Master/InsertAssessments";
     return this.http.post<any[]>(APIURL, json);
   }
 
   public UpdateAssessments(json: any) {
     debugger
     let APIURL = this.baseURL + "/Master/UpdateAssessments";
     return this.http.post<any[]>(APIURL, json);
   }
 
   public DeleteAssessments(id: any) {
     debugger
     let APIURL = this.baseURL + "/Master/DeleteAssessments?ID=" + id;
     return this.http.get<any[]>(APIURL);
   }
 
 
   public InsertChapterAttachment(data: any) {
     debugger;
     this.url = this.baseURL + '/Master/InsertChapterAttachment';
     return this.http.post(this.url, data);
   }
 
 
 
 
   public GetChapterAttachmentByChapterID(chapterid: any) {
 
     return this.http.get<any[]>(this.baseURL + "/Master/GetChapterAttachmentByChapterID?ChapterID=" + chapterid);
   }
 
   // public GetChapter() {
 
   //   return this.http.get<any[]>(this.host + "/Master/GetChapter");
   // }
 
   // public GetTrainerCourseMapping() {
   //   debugger
   //   let APIURL = this.baseURL + "Master/GetTrainerCourseMapping";
   //   return this.http.get<any[]>(APIURL);
   // }
 
   public InsertTrainerCourseMapping(data: any) {
     debugger;
     this.url = this.baseURL + '/Master/InsertTrainerCourseMapping';
     return this.http.post(this.url, data);
   }
 
   public UpdateTrainerCourseMapping(json: any) {
     debugger
     let APIURL = this.baseURL + "/Master/UpdateTrainerCourseMapping";
     return this.http.post<any[]>(APIURL, json);
   }
 
   public DeleteTrainerCourseMapping(id: any) {
     debugger
     let APIURL = this.baseURL + "/Master/DeleteTrainerCourseMapping?ID=" + id;
     return this.http.get<any[]>(APIURL);
   }
 
   public GetChapter() {
     debugger
     let APIURL = this.baseURL + "/Master/GetChapter";
     return this.http.get<any[]>(APIURL);
   }
   public GetCertification() {
     debugger
     let APIURL = this.baseURL + "/Master/GetCertification";
     return this.http.get<any[]>(APIURL);
   }
 
 
   public GetChapterListByEmployeeID(EmployeeID: any) {
     debugger
     let APIURL = this.baseURL + "/Master/GetChapterListByEmployeeID?EmployeeID=" + EmployeeID;
     return this.http.get<any[]>(APIURL);
   }
 
 
   public InsertChapter(json: any) {
     debugger
     let APIURL = this.baseURL + "/Master/InsertChapter";
     return this.http.post<any[]>(APIURL, json);
   }
 
   public InsertCertification(json: any) {
     debugger
     let APIURL = this.baseURL + "/Master/InsertCertification";
     return this.http.post<any[]>(APIURL, json);
   }
 
 
 
   public UpdateChapter(json: any) {
     debugger
     let APIURL = this.baseURL + "/Master/UpdateChapter";
     return this.http.post<any[]>(APIURL, json);
   }
 
   public DeleteChapter(ID: any) {
     debugger
     return this.http.get<any[]>(
       this.baseURL + "/Master/DeleteChapter?ID=" + ID);
   }
 
   public InsertEnroll(data: any) {
     debugger;
     this.url = this.baseURL + '/Master/InsertEnroll';
     return this.http.post(this.url, data);
   }
 
   public UpdateEnroll(json: any) {
     debugger
     let APIURL = this.baseURL + "/Master/UpdateEnroll";
     return this.http.post<any[]>(APIURL, json);
   }
 
   public GetEnroll() {
 
     return this.http.get<any[]>(this.baseURL + "/Master/GetEnroll");
   }
 
   public DeleteEnroll(ID: any) {
     return this.http.get<any[]>(
       this.baseURL + "/Master/DeleteTrainingEnrollment?ID=" + ID);
   }
   public DeleteTestResponseDetails(ID: any) {
     return this.http.get<any[]>(
       this.baseURL + "/Master/DeleteTestResponseDetails?ID=" + ID);
   }
   
 
   public UpdateErollmentStatusApproved(data: any) {
     debugger;
     this.url = this.baseURL + '/Master/UpdateErollmentStatusApproved';
     return this.http.post(this.url, data);
   }
 
   public UpdateErollmentStatusRejected(data: any) {
     debugger;
     this.url = this.baseURL + '/Master/UpdateErollmentStatusRejected';
     return this.http.post(this.url, data);
   }
 
   public UpdateChapterAttachment(data: any) {
     debugger;
     this.url = this.baseURL + '/Master/UpdateChapterAttachment';
     return this.http.post(this.url, data);
   }
 
   public GetApproveCourse(staffid: any) {
 
     return this.http.get<any[]>(this.baseURL + "/Master/GetApproveCourse?StaffID=" + staffid);
   }
 
   public GetTrainerCourseMappingDashboard() {
 
     return this.http.get<any[]>(this.baseURL + "/Master/GetTrainerCourseMappingDashboard");
   }
 
   public GetUnmappedTrainer() {
 
     return this.http.get<any[]>(this.baseURL + "/Master/GetUnmappedTrainer");
   }
 
   public GetAllCounts(staffid: any, typeid: any) {
 
     return this.http.get<any[]>(this.baseURL + "/Master/GetAllCounts?StaffID=" + staffid + '&TypeID=' + typeid);
   }
   // public GetAllCounts() {
 
   //   return this.http.get<any[]>(this.baseURL + "/Master/GetAllCounts?StaffID=");
   // }
 
   public InsertTestResponse(data: any) {
     debugger;
     this.url = this.baseURL + '/Master/InsertTestResponse';
     return this.http.post(this.url, data);
   }
 
   public InsertTestResponseDetails(data: any) {
     debugger;
     this.url = this.baseURL + '/Master/InsertTestResponseDetails';
     return this.http.post(this.url, data);
   }
 
   public UpdateTestResponseDetails(data: any) {
     debugger;
     this.url = this.baseURL + '/Master/UpdateTestResponseDetails';
     return this.http.post(this.url, data);
   }
   public UpdateTestResponse(data: any) {
     debugger;
     this.url = this.baseURL + '/Master/UpdateTestResponse';
     return this.http.post(this.url, data);
   }
 
   //Prashant api service
   public GetTestResponse() {
     return this.http.get<any[]>(
       this.baseURL + "/Master/GetTestResponse"
     );
   }
   public GetTestResponseDetails() {
     return this.http.get<any[]>(
       this.baseURL + "/Master/GetTestResponseDetails"
     );
   }
 
   public GetTrainerCourseMappingByEnroll() {
     return this.http.get<any[]>(
       this.baseURL + "/Master/GetTrainerCourseMappingByEnroll"
     );
   }
 
   public GetAssessmentsByEnroll() {
     return this.http.get<any[]>(
       this.baseURL + "/Master/GetAssessmentsByEnroll"
     );
   }
 
   public GetEnrollCourseChapters() {
     return this.http.get<any[]>(
       this.baseURL + "/Master/GetEnrollCourseChapters"
     );
   }
 
   public GetCoursesByUserID(userid: any) {
     return this.http.get<any[]>(
       this.baseURL + "/Master/GetCoursesByUserID?EmployeeID=" + userid
     );
   }
 
 
 
   public GetAttendance_New() {
 
     return this.http.get<any[]>(this.baseURL + "/Master/GetAttendance_New");
   }
 
   public UpdatePassword(data: any) {
     debugger;
     this.url = this.host + '/Master/UpdatePassword';
     return this.http.post(this.url, data);
   }
 
   public UpdateTrainerPassword(data: any) {
     debugger;
     this.url = this.baseURL + '/Master/UpdateTrainerPassword';
     return this.http.post(this.url, data);
   }
 
 
 
   public InsertAttendance_New(data: any) {
     debugger;
     this.url = this.baseURL + '/Master/InsertAttendance_New';
     debugger
     return this.http.post(this.url, data);
   }
 
 
   public UpdateAttendance_New(data: any) {
     debugger;
     this.url = this.baseURL + '/Master/UpdateAttendance_New';
     return this.http.post(this.url, data);
   }
 
 
   public GetAssessmentResult() {
     debugger;
     return this.http.get<any[]>(
       this.baseURL + '/Master/GetAssessmentResult');
   }
 
   public GetCourseDropdown() {
     debugger;
     return this.http.get<any[]>(
       this.baseURL + '/Master/GetCourseDropdown');
   }
 
   public GetChapterAssessment() {
     debugger;
     return this.http.get<any[]>(
       this.baseURL + '/Master/GetChapterAssessment');
   }
 
   public GetEnrollCourseChaptersAssessment() {
     debugger;
     return this.http.get<any[]>(
       this.baseURL + '/Master/GetEnrollCourseChaptersAssessment');
   }
 
 
   public GetTestResponsenew() {
     debugger;
     return this.http.get<any[]>(
       this.baseURL + '/Master/GetTestResponsenew');
   }
 
   public GetEmpcoursecounts(StaffID: any) {
     debugger;
     return this.http.get<any[]>(
       this.baseURL + '/Master/GetEmpcoursecounts?StaffID=' + StaffID);
   }
 
   public UpdateEmpCoursedetails(id: any) {
     debugger;
     return this.http.get<any[]>(
       this.baseURL + '/Master/UpdateEmpCoursedetails?ID=' + id);
   }
 
 
 
   public UpdateCourseCompleted(StaffID: any, courseid: any) {
     debugger;
     return this.http.get<any[]>(
       this.baseURL + '/Master/UpdateCourseCompleted?StaffID=' + StaffID + '&CourseID=' + courseid);
   }
 
 
   public GetEnrollCourseCertificate(StaffID: any) {
     debugger;
     return this.http.get<any[]>(
       this.baseURL + '/Master/GetEnrollCourseCertificate?StaffID=' + StaffID);
   }
 
 
   public GetTrainerReport(Year: any, Month: any) {
     debugger;
     return this.http.get<any[]>(
       this.baseURL + '/Master/GetTrainerReport?Year=' + Year + '&Month=' + Month);
   }
 
 
   public GetEnrollCourseCertificateNew(ID: any) {
     debugger;
     return this.http.get<any[]>(
       this.baseURL + '/Master/GetEnrollCourseCertificateNew?ID='+ID);
   }
 
 
    
   public GetDepartmentMaster() {
     debugger;
     return this.http.get<any[]>(
       this.host + '/Announcement/GetDepartmentMaster');
   }
 
   public GetNotification(UserID: any) {
     return this.http.get<any[]>(
       this.host + "/User/GetNotification?UserID=" + UserID
     );
   }
 
   public ClearNotificationByID(ID: any) {
     return this.http.get<any[]>(
       this.host + "/Announcement/ClearNotificationByID?ID=" + ID);
   }
 
 
   public GetSupportTickets() {
     return this.http.get<any[]>(
       this.host1 + "Master/GetSupportTickets"
     );
   }
 
   public AttachmentsUploadsss(files: any) {
     debugger
     let formdata: FormData = new FormData();
     for (let i = 0; i < files.length; i++) {
       formdata.append('file_upload', files[i], files[i].name);
     }
     
     debugger
     let APIURL = this.host1 + "/Master/UploadImages/";
     return this.http.post(APIURL, formdata);
   }
 
   public InsertSupportTickets(data: any) {
     debugger;
     this.url = this.host1 + '/Master/InsertSupportTickets';
     return this.http.post(this.url, data);
   }
 
   public InsertAttachment(data: any) {
     debugger;
     this.url = this.host1 + '/Master/InsertAttachment';
     return this.http.post(this.url, data);
   }
 
   public UpdateSupportTickets(data: any) {
     debugger;
     this.url = this.host1 + '/Master/UpdateSupportTickets';
     return this.http.post(this.url, data);
   }
 
   public GetSupportAttachment() {
     return this.http.get<any[]>(this.host1 + "/Master/GetSupportAttachment");
   }
 
   public DeleteSupportTickets(ID: any) {
     return this.http.get<any[]>(
       this.host1 + "/Master/DeleteSupportTickets?ID=" + ID);
   }
 
   public InsertExceptionLogs(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertExceptionLogs';
    return this.http.post(this.url, data);

  }


  public GetAllStaffNew() {
    return this.http.get<any[]>(
      this.host + "/Master/GetAllStaffNew"

    );
  }

  public GetDepartment() {
    debugger
    let APIURL = this.host + "/Announcement/GetDepartmentMaster";
    return this.http.get<any[]>(APIURL);
  }

  public GetCityType() {
    return this.http.get<any[]>(
      this.host + "/Building/GetCityType?StateID=4"
    );
  }

  public GetChatGroupMaster() {
    debugger;
    this.url = this.host + "/Announcement/GetChatGroupMaster";
    return this.http.get<any[]>(this.url);
  }

  public InsertGroupChatMaster(data: any) {
    debugger;
    this.url = this.host + "/Announcement/InsertChatWeb";
    return this.http.post(this.url, data);
  }

  public InsertNotification(data: any) {
    debugger;
    this.url = this.host + '/User/InsertNotification';
    return this.http.post(this.url, data);
  }

  public GetSubsidaryMaster() {

    return this.http.get<any[]>(this.host + "/Announcement/GetSubsidaryMaster");
  }

  public Authenicate(data: any) {
    debugger;
    // this.url = this.host + "/Master/Verifyotp";
    this.url = this.baseURL + '/Master/Authenicate';
    return this.http.post(this.url, data);
  }
 
 
  public GetExceptEnrolledCourseByStaffID(EmployeeID: any) {
 
    return this.http.get<any[]>(this.baseURL + "/Master/GetExceptEnrolledCourseByStaffID?EmployeeID=" + EmployeeID);
  }
 
 }