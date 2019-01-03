import React,{Component} from 'react'
import './style.scss'

//提示
function HeaderTip(params) {
  return(
    <div className="header_tip">温馨提示：未注册厚钱包账号的手机号，登录时将自动注册</div>
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
               <input placeholder="请输入验证码" />
               <span className="sms_code">获取验证码</span>
            </div>)
  }else{
    item=(<div className="password">
            <input placeholder="请输入密码" />
          </div>);
    forgetPass=<p className="forget_pass">忘记密码</p>
  }
  return (
    <section>
      <div className="login_submit">
        <div className="phone">
          <input placeholder="请输入11位手机号码" />
        </div>
        {item}
      </div>
      {forgetPass}
      <div className="submit">登录</div>
    </section>
  )
  
}


class Login extends Component{
  constructor(props){
    super(props)
    this.state={
      loginType:1,
    }
  }
  render(){
    return(
      <div>
        <HeaderTip></HeaderTip>
        <LoginCheck type={this.state.loginType} Check={(e)=>this.loginHandle(e)}></LoginCheck>
        <LoginSubmit type={this.state.loginType}></LoginSubmit>
      </div>

    )
  }
  loginHandle(e){
    this.setState({ loginType: e.target.value})
  }
}

export default Login;