import {Component, OnInit} from '@angular/core';
import {CoreService} from '@core/services/core.service';
import {LocalStorageService} from '@core/services/local-storage.service';
import {DeleteProjectModel, ProjectModel} from '@app/dashboard/models/project-model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomerInformationService} from '@core/services/customer-information.service';
import {AuthService} from '@app/auth/services/auth.service';
import {Feedback} from '@app/dashboard/pages/project-management/Models/Feedback';
import {ProjectManagementService} from '@app/dashboard/Services/project-management.service';
import {Rate} from '@app/dashboard/pages/project-management/Models/Rate';

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
                private customerInformationService: CustomerInformationService,
                private projectManagementService: ProjectManagementService) {
    }

    ngOnInit(): void {

        this.projectPage = 'dashboard/products?projectId=';
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
                if (x.name.toLowerCase().includes(text.toLowerCase())) {
                    this.filteredProjectModelList.push(x);
                }
            });
        } else if (this.filterTag === 'active') {
            this.projectModelList.forEach(x => {
                if (x.name.toLowerCase().includes(text.toLowerCase()) && x.status) {
                    this.filteredProjectModelList.push(x);
                }
            });
        } else if (this.filterTag === 'passive') {
            this.projectModelList.forEach(x => {
                if (x.name.toLowerCase().includes(text.toLowerCase()) && !x.status) {
                    this.filteredProjectModelList.push(x);
                }
            });
        }
    }

    public getProjects() {
        this.projectManagementService.getProjects().subscribe((data) => {
            if (data.success) {
                this.customerInformationService.showSuccess(data.message);
                this.projectModelList = new Array<ProjectModel>();
                data.data.forEach(model => {
                    this.projectModelList.push(model);
                    this.projectModelList.forEach(x => {
                        x.status ? this.activeProjectCount += 1 : this.terminatedProjectCount += 1;
                    });
                });
                return;
            }
            this.customerInformationService.showError(data.message);
        });
    }

    public deleteProject() {
        this.activeProjectCount = 0;
        this.terminatedProjectCount = 0;
        const project = this.projectModelList.find(x => x.id === this.DeleteProjectId);
        const deleteProjectModel = new DeleteProjectModel();
        deleteProjectModel.name = project.name;
        this.projectManagementService.deleteProject(deleteProjectModel).subscribe((data) => {
            if (data.success) {
                this.customerInformationService.showSuccess(data.message);
                this.getProjects();
                return;
            }
            this.customerInformationService.showError(data.message);
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
            Message: new FormControl(''),
        });
    }

    public createProject() {
        const projectModel = Object.assign({}, this.createProjectForm.value);
        this.projectManagementService.createProject(projectModel).subscribe((data) => {
            if (data.success) {
                this.customerInformationService.showSuccess(data.message);
                this.getProjects();
                return;
            }
            this.customerInformationService.showError(data.message);
        });
    }

    public setFeedbackRate(r: number) {
        const rate = new Rate();
        rate.Value = r;
        this.projectManagementService.sendRate(rate);
    }

    public sendFeedback() {
        let feedback: Feedback;
        feedback = Object.assign({}, this.feedbackForm.value);
        this.projectManagementService.sendFeedbackDetailed(feedback);
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
