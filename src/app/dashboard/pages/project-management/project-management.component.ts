import {Component, OnInit} from '@angular/core';
import {CoreService} from '@core/services/core.service';
import {LocalStorageService} from '@core/services/local-storage.service';
import {ProjectModel} from '@app/dashboard/models/project-model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerInformationService} from '@core/services/customer-information.service';
import {AuthService} from '@app/auth/services/auth.service';

@Component({
    selector: 'app-project-managment',
    templateUrl: './project-management.component.html',
    styleUrls: ['./project-management.component.scss'],
})
export class ProjectManagementComponent implements OnInit {

    activeProjectCount: number;
    terminatedProjectCount: number;
    profileName: string;
    profilePicture: string;
    filterTag: string;
    DeleteProjectId: bigint;
    deleteInputConditionText: string;
    rate: number;

    projectModelList: Array<ProjectModel> = [];
    filteredProjectModelList: Array<ProjectModel> = [];
    createProjectForm: FormGroup = new FormGroup({});
    feedbackForm: FormGroup = new FormGroup({});
    projectPage: string;

    constructor(public coreService: CoreService,
                private localStorageService: LocalStorageService,
                private modalService: NgbModal,
                private formBuilder: FormBuilder,
                public authService: AuthService,
                private customerInformationService: CustomerInformationService) {
    }

    ngOnInit(): void {

        this.projectPage = '/project-details?projectId=';
        this.activeProjectCount = 0;
        this.terminatedProjectCount = 0;
        this.DeleteProjectId = BigInt(0);
        this.rate = 4;

        this.profileName = 'burak16305825';
        this.filterTag = 'total';
        this.projectModelList = new Array<ProjectModel>();
        this.filteredProjectModelList = new Array<ProjectModel>();

        this.profilePicture = this.getProfilePictureName() + '.png';
        this.getProjects();
        this.setFilterProjectByTag(this.filterTag);
        this.createProjectFormEvent();
        this.createFeedbackFormEvent();
    }

    public getProfilePictureName() {
        if (this.localStorageService.getItem('profilePictureName') === null) {
            const imageNumb = (Math.floor(Math.random() * 6) + 1).toString();
            this.localStorageService.setItem('profilePictureName', imageNumb);
            return imageNumb;
        }
        return this.localStorageService.getItem('profilePictureName');
    }

    public setFilterProjectByTag(tag: string) {
        this.filteredProjectModelList = new Array<ProjectModel>();
        this.filterTag = tag;
        if (tag === 'total') {
            this.filteredProjectModelList = this.projectModelList;
        } else if (tag === 'active') {
            this.projectModelList.forEach(x => {
                if (x.status) {
                    this.filteredProjectModelList.push(x);
                }
            });
        } else if (tag === 'passive') {
            this.projectModelList.forEach(x => {
                if (!x.status) {
                    this.filteredProjectModelList.push(x);
                }
            });
        }
    }

    public searchFilterByText(text: string) {
        this.filteredProjectModelList = new Array<ProjectModel>();
        if (this.filterTag === 'total') {
            this.projectModelList.forEach(x => {
                if (x.projectName.toLowerCase().includes(text.toLowerCase())) {
                    this.filteredProjectModelList.push(x);
                }
            });
        } else if (this.filterTag === 'active') {
            this.projectModelList.forEach(x => {
                if (x.projectName.toLowerCase().includes(text.toLowerCase()) && x.status) {
                    this.filteredProjectModelList.push(x);
                }
            });
        } else if (this.filterTag === 'passive') {
            this.projectModelList.forEach(x => {
                if (x.projectName.toLowerCase().includes(text.toLowerCase()) && !x.status) {
                    this.filteredProjectModelList.push(x);
                }
            });
        }
    }

    public getProjects() {
        const project = new ProjectModel();
        project.id = BigInt(1);
        project.projectName = 'First project';
        project.projectBody = 'First project description';
        project.status = true;
        project.createdAt = new Date('2021-03-25');
        const project2 = new ProjectModel();
        project2.id = BigInt(2);
        project2.projectName = 'test';
        project2.projectBody = 'First project description';
        project2.status = false;
        project2.createdAt = new Date();
        this.projectModelList.push(project);
        this.projectModelList.push(project2);
        this.projectModelList.forEach(x => {
            x.status ? this.activeProjectCount += 1 : this.terminatedProjectCount += 1;
        });
    }

    public deleteProject() {
        this.activeProjectCount = 0;
        this.terminatedProjectCount = 0;
        const projectModelIndex = this.projectModelList.map(x => {
            return x.id;
        }).indexOf(this.DeleteProjectId);
        this.projectModelList.splice(projectModelIndex, 1);
        this.setFilterProjectByTag(this.filterTag);
        this.projectModelList.forEach(x => {
            x.status ? this.activeProjectCount += 1 : this.terminatedProjectCount += 1;
        });
    }

    setDeleteInputConditionText(value: any) {
        this.deleteInputConditionText = value;
    }

    private createProjectFormEvent(): void {
        this.createProjectForm = this.formBuilder.group({
            ProjectName: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(30),
            ]),
            ProjectBody: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
            ]),
        });
    }
    private createFeedbackFormEvent(): void {
        this.feedbackForm = this.formBuilder.group({
            feedback: new FormControl(''),
        });
    }

    public createProject() {
        const projectModel = Object.assign({}, this.createProjectForm.value);
        console.log(projectModel);
    }

    public setFeedbackRate(rate: number){
        this.rate = rate;
    }

    public sendFeedback(){
        const feedback = Object.assign({}, this.feedbackForm.value);
        console.log(feedback);
        console.log(this.rate);
    }

    public showPopup(Content: any): void {
        this.modalService.open(Content);
    }

    public showDeletePopUp(Content: any, id: bigint) {
        this.DeleteProjectId = id;
        this.modalService.open(Content, {centered: true})
            .result.then((result) => {
        }, (reason) => {
            this.DeleteProjectId = BigInt(0);
        });
    }
}
