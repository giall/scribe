export enum Role {
  User,
  Admin
}

export class User {
  username: string;
  email: string;
  role: Role;
  verified: boolean;
}