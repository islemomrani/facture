import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
userUrl='http://localhost:3000/api/users';
  constructor(private httpClient:HttpClient) { }
//signup:
addUser(user:any , picture:File){
  let formData = new FormData();
  formData.append("firstName", user.firstName);
  formData.append("lastName", user.lastName);
  formData.append("phone", user.phone);
  formData.append("email", user.email);
  formData.append("password", user.password);
  formData.append("role", user.role);
  formData.append("picture", picture);
return this.httpClient.post<{msg:string}>( this.userUrl +'/signup',formData);
}
getAllUsers(){
  return this.httpClient.get<{users:any}>(this.userUrl);
}
getUserById(id:any){
  return this.httpClient.get<{user:any}>(`${this.userUrl}/${id}`);
}
deleteUser(id:any){
  return this.httpClient.delete<{msg:string}>(`${this.userUrl}/${id}`);
}



editProfile(user:any){
  
  return this.httpClient.put<{msg:string}>(this.userUrl,user);
}

login(userObj:any){
return this.httpClient.post<{msg:string,user:any}>(this.userUrl+'/login',userObj);
}



}
