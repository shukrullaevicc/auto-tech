import axios from "axios";
import store from "../redux/store"; 
import { SIGN_OUT } from "../redux/actions/action-types";

const apiInstance = axios.create({
   baseURL: import.meta.env.VITE_API_BASE,
   headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${store.getState().token}`,
   },
   timeout: 10000
});


apiInstance.interceptors.request.use(
   (request) => {
      request.headers["Authorization"] = `Bearer ${store.getState().token}`;
      return request
   },
   (error) => {
      return Promise.reject(error)
   }
)

apiInstance.interceptors.response.use(
   (response) => {
      if(response){
         return response
      }
   },
   (error) => {
      if(error.response.status === 401 || error.response.status === 403){
         store.dispatch({ type: SIGN_OUT })
      }
      return Promise.reject(error)
   }
)

export default apiInstance