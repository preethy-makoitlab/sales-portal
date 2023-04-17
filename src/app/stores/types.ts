export enum Titles {
  Mr,
  Ms
}

export enum Status {
  'Active' = 'active',
  'Inactive' = 'inactive'
}

export interface ISubscriptionCount {
  total: number
  available?: number
  active?: number
}