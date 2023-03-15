import axios from "axios";

export const api = axios.create({baseURL:"http://localhost:3000/user",responseType:"json"});

///emna 
export const UserApi = {
    async register(body) {
        return {data} = await api.post('/register',post);
    },
    async getUserById(userId) {
        return {data} = await api.get(`/profile/${userId}`); 
    },
    async editUserProfile(userId,body) {
        return {data} = await api.put(`/${userId}`,body);
    }
}

// dorra

export const PassApi ={
    async forgetPassword(email){
        return {data} = await api.post('/forgetPassword',email);
    },
    async resetPassword(newPass){
        return {data} = await api.post('/newPass/:code/:id',newPass);
    }
}