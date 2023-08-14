// 인사연관코드정보
export class HrmRelationCode {
  /**
   * @param relationId 인사연관코드ID
   * @param relCode 연관코드
   * @param relCodeName 연관코드명
   * @param parentTypeId 부모 인사유형코드 Id
   * @param parentTypeName 부모 인사유형코드명
   * @param parentDetailId 부모 인사상세코드 Id
   * @param parentDetailName 부모 인사상세코드명
   * @param childTypeId 자식 인사유형코드 Id
   * @param childTypeName 자식 인사유형코드명
   * @param childDetailId 자식 인사유형상세코드 Id
   * @param childDetailName 자식 인사유형상세코드명
   */
  constructor(
    public relationId: number,
    public relCode: string,
    public relCodeName: string,
    public parentTypeId: string,
    public parentTypeName: string,
    public parentDetailId: string,
    public parentDetailName: string,
    public childTypeId: string,
    public childTypeName: string,
    public childDetailId: string,
    public childDetailName: string) {}
  }
