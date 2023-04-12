import { Language } from './common-models';

export const LANGUAGES: Language[] = [{ name: 'English', code: 'en-IN' }, { name: 'தமிழ்', code: 'ta-IN' }, { name: 'हिन्दी', code: 'hi-IN' }]

export enum ApprovalStatus {
    NEW = 1,
    APPROVED = 2,
    INPROGRESS = 3,
    REJECTED = 4,
    ONHOLD = 5
}

export enum ApiType{
    get = 'get',
    post = 'post',
    delete = 'delete',
    patch = 'patch',
    put = 'put'
}
export  interface CustomResponse{ 
    status?: number;
    error?: string;
    data?: any;
}