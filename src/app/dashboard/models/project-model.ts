export class ProjectModel {
    id: bigint;
    name: string;
    description: string;
    customerId: bigint;
    status: boolean;
    createdAt: Date;

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
