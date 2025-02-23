import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import { CommonModule } from '@angular/common';
import { CreateTeacherComponent } from '../../components/create-teacher/create-teacher.component';
import { EditTeacherComponent } from '../../components/edit-teacher/edit-teacher.component';
import { CreateSubjectComponent } from '../../components/create-subject/create-subject.component';
//import { TeachersListComponent } from '../../components/teachers-list/teachers-list.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-teachers',
  imports: [CommonModule, CreateTeacherComponent, EditTeacherComponent, CreateSubjectComponent],
  providers:[TeacherService],
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
  teachers: any[] = [];
  subjects:any[]=[];
  editingTeacher: any = null;

  private onClickListener!: EventListener; //non-null assertion

  constructor(
    private teacherService: TeacherService,
    private authService: AuthService,
    private router: Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadSubjects();
    this.loadTeachers();
    this.checkAuthStatus(); 
    this.bindHostListeners();
    this.route.queryParams.subscribe(params => {
      const teacherId = params['teacherId'];
      if (teacherId) {
        console.log("teacherId")
        this.loadTeacherForEditing(teacherId);
      }
    });
  }

  ngOnDestroy(): void { //lifecycle hook of the component
    console.log('Cleaning up listeners...');
    this.removeHostListeners();  
  }

  loadTeacherForEditing(teacherId: number) {
    this.teacherService.getTeacherById(teacherId).subscribe((teacher) => { //create route
      this.editingTeacher = teacher[0];
    });}

  checkAuthStatus() {
    console.log('Checking refresh token...');
    this.authService.isAuthenticated().subscribe((isAuthenticated) => {
      if (!isAuthenticated) {
        console.log('Refresh token expired or not found. Logging out...');
        this.authService.logout();
        this.router.navigate(['login']);
      }
    });
  }

  bindHostListeners() {
    console.log('Binding HostListeners for scroll and click events.');
    this.onClickListener = this.onUserInteraction.bind(this); //this should still refer to comp not doc when calling fct.

    this.addHostListeners();
  }

  addHostListeners() {
    document.addEventListener('click', this.onClickListener);
  }

  removeHostListeners() {
    document.removeEventListener('click', this.onClickListener);
  }

  onUserInteraction(event: Event) {
    console.log('User interaction detected: Click event');
    this.checkAuthStatus();
  }

  loadTeachers() {
    this.teacherService.getTeachers().subscribe((data) => {
      this.teachers = data;
      this.teachers.forEach(teacher => {
        teacher.subjectNames = teacher.subjects.map((subjectId: number) => {
          const subject = this.subjects.find(subj => subj.id === subjectId);
          return subject ? subject.subjectName : '';  
        });
      });
    });
  }

  loadSubjects(){
    this.teacherService.getSubjects().subscribe((data)=>{
      this.subjects = data;
    })
  }

  // editTeacher(teacher: any) {
  //   this.editingTeacher = { ...teacher };
  // }

  updateTeacher(updatedTeacher: any) { //executed when edit form event emitter fires
    this.teacherService.editTeacher(updatedTeacher.id, updatedTeacher).subscribe(
      (response) => { //calls service fct. to talk to the backend and edit the teacher info in db based on id
        this.loadTeachers();
        this.editingTeacher = null;
      },
      (error) => {
        console.log('Error updating teacher:', error);
      }
    );
  }

  closeEditor() {
    this.editingTeacher = null;
  }

  deleteTeacher(teacherId: number) {
    this.teacherService.deleteTeacher(teacherId).subscribe(
      () => {
        this.teachers = this.teachers.filter((teacher) => teacher.id !== teacherId);
      },
      (error) => {
        console.log('Error deleting teacher: ', error);
      }
    );
  }

  logout() {
    console.log('Logging out');
    this.authService.logout();
    this.router.navigate(['login']);
  }

  onTeacherCreated() {
    this.loadTeachers();
  }
  onSubjectCreated(){
    this.loadSubjects();
  }
  onSubjectDeleted(subjectName:string){
    const subject = this.subjects.find(subj =>subj.subjectName === subjectName)
    if(subject){
      console.log("Subject Id", subject.id)
      this.teacherService.deleteSubject(subject.id).subscribe(()=>{
        this.loadSubjects();
        this.loadTeachers();
      })
    }
    else{
      console.log("Subject not found");
    }
  }
}
