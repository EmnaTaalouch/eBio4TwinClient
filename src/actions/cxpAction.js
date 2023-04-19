import axios from 'axios';

export const api = axios.create({ baseURL: 'http://localhost:5000/cxpForm', responseType: 'json' });

export const CxpApi = {
    async getCxp() {
        const { data } = await api.get('/listForms');
        return data;
      },
      async addCxp(refOrder, userId,body) {
        const { data } = await api.post(`/addForm/${refOrder}/${userId}`,body);
        return data;
      },
      async deleteCxp(id){
        await api.delete(`/deleteForm/${id}`)
      },
      async updateCxp(id,body){
       const {data} = await api.put(`/updateForm/${id}`,body);
       return data;
      }

      
  };