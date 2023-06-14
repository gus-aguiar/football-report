export interface IUsers {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
}

export interface ILogin {
  email: string,
  password: string,
}
