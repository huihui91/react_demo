import Http from './server.js'


export async function  login(data) {
  return await Http.post('common/appLogin',data)
}