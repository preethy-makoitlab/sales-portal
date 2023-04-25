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

export interface IListenerCount {
  totalChats: number
  totalMins: number
  totalUsers: number
  totalListeners: number
}