import { Language } from './common-models';

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