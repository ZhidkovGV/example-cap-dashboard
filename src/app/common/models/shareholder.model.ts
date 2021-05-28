export const SHARE_TYPES_ARRAY = ['COMMON' , 'PREFERRED' , 'REDEEMABLE' , 'DEFERRED' , 'NON-VOTING', 'CERTIFICATES'] as const
export type ShareType = typeof SHARE_TYPES_ARRAY[number];

export interface IShareholder {
  id: string;
  name: string;
  sharesByType: Partial<Record<ShareType, ISharesData>>;
}

export interface ICompany {
  id: string;
  name: string;
  shareholders: IShareholder[];
  outstandingSharesByType: Partial<Record<ShareType, ISharesData>>;
}

export interface ISharesData {
  cost: number;
  sharesCount: number;
}

export interface IShareholdersTableMetaData {
  totalCost: number;
  totalSharesByType: { type: string, cost: number, totalCost: number }[];
}

