import { ProductData } from "./product"

export interface User {
    id:string,
    userName: string,
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    passwordConfirm:string,
    role:string
    createdAt: string,
    updatedAt: string,
    searches:string[],
    items:ProductData[]
  }