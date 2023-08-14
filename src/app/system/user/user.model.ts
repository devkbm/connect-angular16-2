export interface User {
  userId: string | null;
  organizationCode: string | null;
  staffNo: string | null;
  password?: string | null;
  name: string | null;
  deptId: string | null;
  mobileNum: string | null;
  email: string | null;
  imageBase64: string | null;
  enabled: boolean | null;
  authorityList: string[] | null;
  menuGroupList: string[] | null;
}
