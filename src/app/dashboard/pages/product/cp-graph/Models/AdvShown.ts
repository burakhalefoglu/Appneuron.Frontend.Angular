
export class AdvDto {
    Name: string;
    Version: string;
    Id: number;
}


export class AdvRequest {
    ProjectId: number;
    AdvDto: AdvDto[];
}

export class AdvResponseDto {
    StrategyNames: string[];
    Counts: number[];
}
