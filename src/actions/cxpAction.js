import axios from 'axios';

export const api = axios.create({ baseURL: 'http://localhost:5000/cxpForm', responseType: 'json' });
export const apiWaste = axios.create({ baseURL: 'http://localhost:5000/wasteForm', responseType: 'json' });
export const CxpApi = {
  async getCxp() {
    const { data } = await api.get('/listForms');
    return data;
  },
  async addCxp(refOrder, userId, body) {
    const { data } = await api.post(`/addForm/${refOrder}/${userId}`, body);
    return data;
  },
  async deleteCxp(id) {
    await api.delete(`/deleteForm/${id}`)
  },
  async updateCxp(id, body) {
    const { data } = await api.put(`/updateForm/${id}`, body);
    return data;
  },
  async addWasteForm(id,products) {
    const { data } = await apiWaste.post(`/addWasteForm/${id}`,products)
    return data;
  },
  async updateWasteForm(id,products) {
    const { data } = await apiWaste.put(`/updateWasteForm/${id}`,products)
    return data;
  },
  async displayWasteForm(id){
    const {data} = await apiWaste.get(`/wasteForm/${id}`)
    return data;
  }


};