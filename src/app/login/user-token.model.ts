import { MenuGroup } from '../system/menu/menu-group.model';
import { Authority } from '../system/authority/authority.model';

export interface UserToken {
  token: string;
  userId: string;
  userName: string;
  organizationCode: string;
  staffNo: string;
  email: string;
  imageUrl: string;
  ipAddress: string;
  authorities: Authority[];
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
