export interface Staff {
  staffNo: string | null;
  name: string | null;
  nameEng: string | null;
  nameChi: string | null;
  residentRegistrationNumber: string | null;
  gender: string | null;
  birthday: Date | null;
  workCondition: string | null;
  imagePath: string | null;
  deptHistory?: any;
  jobHistory?: any;
  deptChangeHistory?: any;
  jobChangeHistory?: any;
  statusChangeHistory?: any;
}
