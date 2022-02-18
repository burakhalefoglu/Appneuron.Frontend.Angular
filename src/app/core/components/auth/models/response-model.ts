export class TokenDataModel {
  success: boolean;
  message: string;
  data: Data;
}

export class MessageModel {
  success: boolean;
  message: string;
}

export class MessageWithProjectDataModel {
  success: boolean;
  message: string;
  data: {
    id: number;
    projectKey: string;
    projectName: string;
    statuse: boolean;
    createdAt: Date;
    customerId: number;
    projectBody: string;
  };
}

export class Data {
  expiration: string;
  token: string;
  claims: string[];
}
