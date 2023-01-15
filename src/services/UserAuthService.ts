import { useToken } from "../auth/useToken";
import { httpAuth } from "../http-common";
import { User } from "../types/user.js";
import { ProductData } from "../types";
type UserLogin = Omit<
  User,
  | "id"
  | "userName"
  | "firstName"
  | "lastName"
  | "passwordConfirm"
  | "role"
  | "createdAt"
  | "updatedAt"
  | 'searches' 
  | 'items'
>;
type UserRgister = Omit<User, "id" | "role" | "createdAt" | "updatedAt" | 'searches' | 'items'>;
class UserAuthService {
  Register(user: UserRgister) {
    return httpAuth.post("/auth/register", {
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      passwordConfirm: user.passwordConfirm,
    });
  }

  LogIn(user: UserLogin) {
    return httpAuth.post("/auth/login", {
      email: user.email,
      password: user.password,
    });
  }

  GetUser(userId: string) {
    return httpAuth.get("/users/me", { data: { id: userId } });
  }
  GetUserItems(userId: string) {
    return httpAuth.get(`/users/me/items/${userId}`);
  }
  AddUserItem(userId: string, item: ProductData | undefined) {
    return httpAuth.put(`/users/me/addItem/${userId}`, {
      item:item
    });
  }
  DeleteUserItem(userId: string, itemId:string) {
    return httpAuth.put(`/users/me/deleteItem/${userId}`, {
      itemId:itemId
    });
  }
 
  AddUserSearches(userId: string, searchWord: string) {
    return httpAuth.put(`/users/me/addSearch/${userId}`, {
      searchWord:searchWord
    });
  }
  DeleteUserSearches(userId: string, searchWord: string) {
    return httpAuth.put(`/users/me/deleteSearch/${userId}`, {
      searchWord:searchWord
    });
  }
}

export default new UserAuthService();
