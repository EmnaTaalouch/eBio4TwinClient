import axios from "axios";

export const api = axios.create({baseURL:"http://localhost:3000/user",responseType:"json"});



export const UserApi = {
    async register(body) {
      const  {data} = await api.post('/register','post');
        return data;
    },
    async getUserById(userId) {
        const  {data} = await api.get(`/profile/${userId}`); 
        return data;
    },
    async editUserProfile(userId,body) {
        const  {data} = await api.put(`/${userId}`,body);
        return data;
    },
    async getUsers(){
        return api.get('/listUsers').then((res)=>res.data);
    },
    async searchUsers(body){
        return api.get('/userSearch',body).then((res)=>res.data);
    }

}