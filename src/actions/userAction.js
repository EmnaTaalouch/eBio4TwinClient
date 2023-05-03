import axios from 'axios';

export const api = axios.create({ baseURL: 'http://localhost:5000/user', responseType: 'json' });

/* emna */
export const UserApi = {
  async register(body) {
    const { data } = await api.post('/register', body);
    return data;
  },
  async getUserById(token) {
    const { data } = await api.get(`/profile/${token}`);
    return data;
  },
  async getUserByRole(role) {
    const { data } = await api.get(`/getUserByRole?role=${role}`);
    return data;
  },
  async editUserProfile(userId, body) {
    const { data } = await api.put(`/${userId}`, body);
    return data;
  }, async getUsers() {
    const { data } = await api.get('/listUsers');
    return data;
  },async searchUsers(body) {

    const { data } = await api.get('/userSearch', body)
    return data;
  },
  async editUserProfilling(userId, body) {
    const { data } = await api.put(`/editUserProfilling/${userId}`, body);
    return data;
  },
  async getUsers() {
    const { data } = await api.get('/listUsers');
    return data;
  },
  async searchUsers(body) {
    const { data } = await api.get('/userSearch', body);
    return data;
  },
};
