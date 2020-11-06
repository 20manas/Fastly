export interface UserEssentials {
  id: number;
  username: string;
  name: string;
  email: string;
}

export interface User extends UserEssentials {
  password: string;
}
