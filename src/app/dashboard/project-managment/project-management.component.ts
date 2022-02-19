import {Component, OnInit} from '@angular/core';
import {CoreService} from '@core/services/core.service';
import {LocalStorageService} from '@core/services/local-storage.service';
import {ProjectModel} from '@app/dashboard/models/project-model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-project-managment',
    templateUrl: './project-management.component.html',
    styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent implements OnInit {

    activeProjectCount: number;
    terminatedProjectCount: number;
    profileName: string;
    profilePicture: string;
    filterTag: string;
    ProjectModelList: Array<ProjectModel> = [];
    FilteredProjectModelList: Array<ProjectModel> = [];
    DeleteProjectId: bigint;
    deleteInputConditionText: string;

    constructor(public coreService: CoreService,
                private localStorageService: LocalStorageService,
                private modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.activeProjectCount = 0;
        this.terminatedProjectCount = 0;
        this.DeleteProjectId = BigInt(0);

        this.profileName = 'burak16305825';
        this.filterTag = 'total';
        this.ProjectModelList = new Array<ProjectModel>();
        this.FilteredProjectModelList = new Array<ProjectModel>();
        this.profilePicture = this.getProfilePictureName() + '.png';
      //  this.getProjects();
        this.setFilterProjectByTag(this.filterTag);
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
        this.FilteredProjectModelList = new Array<ProjectModel>();
        this.filterTag = tag;
        if (tag === 'total') {
            this.FilteredProjectModelList = this.ProjectModelList;
        } else if (tag === 'active') {
            this.ProjectModelList.forEach(x => {
                if (x.status) {
                    this.FilteredProjectModelList.push(x);
                }
            });
        } else if (tag === 'passive') {
            this.ProjectModelList.forEach(x => {
                if (!x.status) {
                    this.FilteredProjectModelList.push(x);
                }
            });
        }
    }

    public searchFilterByText(text: string) {
        this.FilteredProjectModelList = new Array<ProjectModel>();
        if (this.filterTag === 'total') {
            this.ProjectModelList.forEach(x => {
                if (x.projectName.toLowerCase().includes(text.toLowerCase())) {
                    this.FilteredProjectModelList.push(x);
                }
            });
        } else if (this.filterTag === 'active') {
            this.ProjectModelList.forEach(x => {
                if (x.projectName.toLowerCase().includes(text.toLowerCase()) && x.status) {
                    this.FilteredProjectModelList.push(x);
                }
            });
        } else if (this.filterTag === 'passive') {
            this.ProjectModelList.forEach(x => {
                if (x.projectName.toLowerCase().includes(text.toLowerCase()) && !x.status) {
                    this.FilteredProjectModelList.push(x);
                }
            });
        }
    }

    public getProjects() {
        const projectModel = new ProjectModel();
        projectModel.id = BigInt(1);
        projectModel.createdAt = new Date('2021-01-25');
        projectModel.projectName = 'Project';
        projectModel.projectBody = 'This is project created by burak halefoglu';
        projectModel.status = false;

        const projectModel2 = new ProjectModel();
        projectModel2.id = BigInt(2);
        projectModel2.createdAt = new Date('2022-01-25');
        projectModel2.projectName = 'Test Project2';
        projectModel2.projectBody = 'This is project created by burak halefoglu';
        projectModel2.status = true;

        this.ProjectModelList.push(projectModel);
        this.ProjectModelList.push(projectModel2);

        this.ProjectModelList.forEach(x => {
            x.status ? this.activeProjectCount += 1 : this.terminatedProjectCount += 1;
        });
    }

    public showDeletePopUp(content, id: bigint) {
        this.DeleteProjectId = id;
        this.modalService.open(content, {centered: true})
            .result.then((result) => {
        }, (reason) => {
            this.DeleteProjectId = BigInt(0);
        });
    }

    public deleteProject() {
        this.activeProjectCount = 0;
        this.terminatedProjectCount = 0;
        const projectModelIndex = this.ProjectModelList.map(x => {
            return x.id;
        }).indexOf(this.DeleteProjectId);
        this.ProjectModelList.splice(projectModelIndex, 1);
        this.setFilterProjectByTag(this.filterTag);
        this.ProjectModelList.forEach(x => {
            x.status ? this.activeProjectCount += 1 : this.terminatedProjectCount += 1;
        });
    }

    setDeleteInputConditionText(value: any) {
        this.deleteInputConditionText = value;
    }
}
