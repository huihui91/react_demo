import axios from "axios";
import { Toast } from "antd-mobile";


function getToken(params) {
  return window.sessionStorage.getItem('uerToken')
}

const instance = axios.create(
  {
    baseURL:"/xloan-app-api/",
    timeout: 10000,
    headers: {
    'filter-key': 'filter-header',
    'x-auth-token': window.userToken || getToken()
  }
  }
)

class Http{

  constructor(){
  /*   axios.defaults.baseURL ="/xloan-app-api/";
    axios.defaults.timeout = 100000; */
  }

  async get(url, resData = {}){
    try{
      let data = await instance.get(url, {
        params: resData
      });
      if (data.code !== '000000') {
        Toast(data.message);
      }
      return data.data;
    }catch(err){
      Toast(err);
    }
  }
  
  async post(url, resData = {}) {
    try {
      let data = await instance.post(url, {
        params: resData
      });
      if (data.code !== '000000') {
        Toast(data.message);
      }
      return data.data;
    } catch (err) {
     console.log(err)
    }
  }

}

export default new Http();