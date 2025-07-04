export enum UserLevel {
  BEGINNER = 0,
  INTERMEDIATE = 1,
  ADVANCED = 2,
  MASTER = 3,
  LEGEND = 4,
}

export const USER_LEVEL_LABEL: Record<number, string> = {
  [UserLevel.BEGINNER]: "초보 심판관",
  [UserLevel.INTERMEDIATE]: "중수 심판관",
  [UserLevel.ADVANCED]: "중고수 심판관",
  [UserLevel.MASTER]: "고수 심판관",
  [UserLevel.LEGEND]: "천상계 심판관",
};
