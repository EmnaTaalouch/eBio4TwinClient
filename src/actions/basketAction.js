import axios from 'axios';

export const api = axios.create({ baseURL: 'http://localhost:5000/basket', responseType: 'json' });

export const orderApi = {
  
    async addToBasket( userId,productId){
      const {data} = await api.post(`/add-to-basket/${userId}`, {productId}  );
  
      return data;
  },
  async showBasket( userId){
    const {data} = await api.get(`/show-basket/${userId}`  );
  
    return data;
  },
  async deleteFromBasket( userId , productId){
    const {data} = await api.delete(`/delete/${userId}` , {productId} );
  
    return data;
  },
  async createOrder( userId ,consumptionDate,members){
    const {data} = await api.post(`/createOrder/${userId}` , {consumptionDate} , {members} );
  
    return data;
  }
  };

  
