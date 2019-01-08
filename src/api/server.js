import axios from "axios";
import { Toast } from "antd-mobile";


function getToken(params) {
  return window.sessionStorage.getItem('uerToken')
}

window.instance = axios.create(
  {
    baseURL:"/xloan-app-api/",
    timeout: 10000,
    headers: {
    'filter-key': 'filter-header',
     "xloanVersion": "1.3.2",
  }
  }
)

let token = getToken();
console.log(token)
if(token) window.userToken=token;
window.instance.defaults.headers.common['x-auth-token'] = window.userToken;

class Http{
  
  constructor(){
  /*   axios.defaults.baseURL ="/xloan-app-api/";
    axios.defaults.timeout = 100000; */
  }

  async get(url, resData = {}){
    try{
      let { data } = await window.instance.get(url, {
        params: resData
      });
      if (data.status !== 0) {
        Toast.info(data.message);
        return false;
      }
      return data;
    }catch(err){
      Toast.info(err.message);
    }
  }
  
  async post(url, resData = {}) {
    try {
      let { data } = await window.instance.post(url, 
       resData
      );

      if (data.status !== 0) {
        Toast.info(data.message);
        return false;
      }
      return data;
    } catch (err) {
      Toast.info(err.message);
    }
  }

}

export default new Http();