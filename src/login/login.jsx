import React,{Component} from 'react'
import './style.scss'

import { login, getSignInfo} from "../api/index.js";

//提示
function HeaderTip(params) {
  return(
    <section>
      <div className="header_tip">温馨提示：未注册厚钱包账号的手机号，登录时将自动注册</div>
    </section>
  )
} 

//选择登录方式
function LoginCheck(props) {
  return(
    <ul className="login_check">
      <li className={props.type === 1 ? 'active' : ''} value="1" onClick={props.Check}>动态密码登录</li>
      <li className={props.type === 2 ? 'active' : ''} value="2" onClick={props.Check}>账号密码登录</li>
    </ul>
  );

}

//登录输入框
function LoginSubmit(props) {
  let item,forgetPass;
  if (props.type ===1){
    item = (<div className="sms" >
      <input name="smscode" value={props.inputData.smsCode}  placeholder="请输入验证码" onChange={props.smsCodeHandle} />
               <span className="sms_code">获取验证码</span>
            </div>)
  }else{
    item=(<div className="password">
      <input name="password" value={props.inputData.password} placeholder="请输入密码" onChange={props.passWordHandle}  />
          </div>);
    forgetPass=<p className="forget_pass">忘记密码</p>
  }
  return (
    <section>
      <div className="login_submit">
        <div className="phone">
          <input name="mobile" placeholder="请输入11位手机号码" onBlur={props.phoneHandle} />
        </div>
        {item}
      </div>
      {forgetPass}
      <div className="submit" onClick={props.submit}>登录</div>
    </section>
  )

}


class Login extends Component{
  constructor(props){
    super(props)
    this.state={
      loginType:1,
      userLoginInfo:{
        mobile: "",
        password: "",
        smsCode: "",
        loginType:'pwd',
        loginChannelId:'2'
      }
    }
  }
  render(){
    return(
      <div>
        <HeaderTip></HeaderTip>
        <LoginCheck type={this.state.loginType} Check={(e)=>this.loginHandle(e)}
         ></LoginCheck>
        <LoginSubmit inputData={this.state.userLoginInfo} type={this.state.loginType} submit={(e) => this.userLogin(e)} phoneHandle={(e) => this.phoneBulr(e)} passWordHandle={e => this.passWordBulr(e)} smsCodeHandle={e => this.smsCodeBulr(e)}></LoginSubmit>
      </div>

    )
  }
  loginHandle(e){
    this.setState({ loginType: e.target.value,
      userLoginInfo: {
        mobile: this.state.userLoginInfo.mobile,
        password: "",
        smsCode: "",
        loginType: 'pwd',
        loginChannelId: '2'
      }
    })
  }
 async userLogin(e){
   this.props.history.push({ pathname: '/confirmloan', query: { day: 'Friday' } })
  /*  this.props.history.push({ pathname: '/confirmloan', state: { day: 'Friday' }  }) */
/*    let data= await login(this.state.userLoginInfo);
 
   if (data.status===0){
     window.userToken = data.data.userToken;
     sessionStorage.setItem('userToken', window.userToken)
     window.instance.defaults.headers.common['x-auth-token'] = window.userToken;
     this.getUserInfo()
   } */


  }
  phoneBulr(e){
    let value = e.target.value
    this.setState((state)=>{
      return {
        userLoginInfo:{
          ...this.state.userLoginInfo,
          mobile:value
        }
       }
    })
 
  }
  passWordBulr(e){
    let value = e.target.value
    this.setState((state) => {
      return {
        userLoginInfo: {
          ...this.state.userLoginInfo,
          password: value
        }
      }
    })
  }
  smsCodeBulr(e){
    let value = e.target.value
    this.setState((state) => {
      return {
        userLoginInfo: {
          ...this.state.userLoginInfo,
          smsCode: value
        }
      }
    })
  }
 async getUserInfo(){
   let data= await getSignInfo();
   console.log(data,'data')

  /*  this.props.history.push('/confirmloan') */
   this.props.history.push({ pathname: '/confirmloan', query: { day: 'Friday' } })
  }
}

export default Login;