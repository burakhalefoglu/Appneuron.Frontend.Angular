export class ProjectModel {
    id: bigint;
    name: string;
    description: string;
    customerId: bigint;
    status: boolean;
    createdAt: Date;

}

export class CreateProjectModel {
    name: string;
    description: string;
}

export class DeleteProjectModel {
    name: string;
}


export class ProjectResponse {
   success: boolean;
   message: string;
   data: ProjectModel;
}


export class ProjectsResponse {
    success: boolean;
    message: string;
    data: ProjectModel[];
}
