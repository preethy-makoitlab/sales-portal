export interface AuthUser{
 
     id: string;
     

      name: string;
    

      password: string;
    

      phoneNumber: string;
    
  
      email: string;
    
   
      roles: string ;
    
  
      loginType?: string;
  
      userId: string;
    

      firstLogin: boolean ;
    
  
      active?: boolean ;
    
 
      applications?: string;
}