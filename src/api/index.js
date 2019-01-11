import Http from './server.js'


//登录
export async function  login(data) {
  return await Http.post('common/appLogin',data)
}

//状态获取
export async function getSignInfo(data) {
  return await Http.get('myloan/queryWechatSignInfo',data)
}

//获取贷款信息
export async function getLoanInfo(data) {
  return await Http.get('h5/loan/getInfo',data)
}
//获取贷款信息
export async function postConfirm(data) {
  return await Http.post("h5/loan/confirm",data)
}
//获取绑卡省、直辖市信息
export async function getDictionary(data) {
  return await Http.post("bankCard/getBankCardDictionary",data)
}

//获取银行卡信息
export async function postBankInfo(data) {
  return await Http.post("bankCard/getCardInfoBin",data)
}
//获取绑卡信息
export async function postBoundBankCards(data) {
  return await Http.post("bankCard/getBoundBankCards",data)
}