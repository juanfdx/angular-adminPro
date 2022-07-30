
export interface User {

  name      : string;
  lastName  : string;
  email     : string;
  password? : string;
  role?     : 'ADMIN_ROLE' | 'USER_ROLE';
  status?   : 'active' | 'inactive';
  image?    : string;
  id?       : string;
  
}