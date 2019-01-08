import Http from './server.js'


//登录
export async function  login(data) {
  return await Http.post('common/appLogin',data)
}

//状态获取
export async function getSignInfo(data) {
  return await Http.get('myloan/queryWechatSignInfo',data)
}