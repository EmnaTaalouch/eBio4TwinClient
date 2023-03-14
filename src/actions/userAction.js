import axios from 'axios';

export const api = axios.create({ baseURL: 'http://localhost:5000/user', responseType: 'json' });

/* emna */
export const UserApi = {
  async register(body) {
    const { data } = await api.post('/register', body);
    return data;
  },
  async getUserById(userId) {
    const { data } = await api.get(`/profile/${userId}`);
    return data;
  },
  async editUserProfile(userId, body) {
    const { data } = await api.put(`/${userId}`, body);
    return data;
  },
};
