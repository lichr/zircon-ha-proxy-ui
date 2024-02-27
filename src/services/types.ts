
export interface IUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  providers: string[];
}

export interface IUserInfo {
  session: boolean;
  user?: IUser;
  tokenId?: string;
}

export interface IProjectInfo {
  groupId: string;
  projectId: string;
  onlineBranch: boolean;
  localBranch: boolean;
  name: string | null;
  updateTime: string | null;
}

