export interface MenuRoleHierarchy {
  title: string;
  key: string;
  checked: boolean;
  expanded: boolean;
  selected: boolean;
  isLeaf: boolean;
  children: MenuRoleHierarchy[];

  menuGroupCode: string;
  menuCode: string;
  roleCode: string;
}
