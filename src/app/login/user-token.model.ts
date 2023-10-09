import { MenuGroup } from '../system/menu/menu-group.model';
import { Role } from '../system/role/role.model';

export interface UserToken {
  sessionId: string;
  userId: string;
  userName: string;
  organizationCode: string;
  staffNo: string;
  email: string;
  imageUrl: string;
  ipAddress: string;
  authorities: Role[];
  menuGroupList: MenuGroup[];
}

/*
export class UserToken {
  constructor(
    public token: string,
    public organizationCode: string,
    public imageUrl: string,
    public authorities: Authority[],
    public menuGroupList: MenuGroup[]) {}
}
*/
