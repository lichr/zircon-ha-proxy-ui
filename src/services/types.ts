
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
  groups: Record<string, any>;
}

export interface IProjectInfo {
  projectId: string;
  groupId: string;
  active: boolean;
  localOnly: boolean;
  onlineBranch: boolean;
  localBranch: boolean;
  name: string;
  updateTime: string;
}

