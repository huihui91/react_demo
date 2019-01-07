import React, { Component } from "react";
import "./style.scss";

//绑卡
function Bindbank() {
  return (
    <div className="bind_bank">
      <ul>
        <li>
          <p>银行卡号</p>
          <div>
            请输入银行卡号
          </div>
        </li>
        <li>
          <p>开户省份</p>
          <div className="arrow">
            请选择开户省份
          </div>
        </li>
        <li>
          <p>开户城市</p>
          <div className="arrow">
            请选择开户城市
          </div>
        </li>
        <li>
          <p>开户银行</p>
          <div>
            请选择开户行
          </div>
        </li>
        <li>
          <p>手机号</p>
          <div>
            请输入手机号
          </div>
        </li>
      </ul>
      <div className="tips">
        <p> 温馨提示：</p>
        <p>1.请确保银行卡预留手机号与注册手机号一致</p>
        <p>2.请确保绑定的银行卡为本人名下借记卡</p>
        <p>3.绑定的银行卡将作为放款和还款的指定银行卡</p>
      </div>
      <div className="bind_bank_btn">
        绑定银行卡
      </div>
    </div>
  )
}

//签约
function Sign(props) {
  return (
    <div className="sign_xloan">
      <ul>
        <li>
          <p>银行卡号</p>
          <div>6225689678092607447</div>
        </li>
        <li>
          <p>开户行</p>
          <div>广发银行</div>
        </li>
        <li>
          <p>开户省份</p>
          <div>上海市</div>
        </li>
        <li>
          <p>开户城市</p>
          <div>上海市</div>
        </li>
      </ul>
      <div className="sign_submit_btn">立即签约</div>
    </div>
  )
}

//银行卡卡号格式化   
function bankCardFormat(str) {
  return str.replace(/(\d{4})(?=\d)/g, '$1' + ' ')
}

//银行卡卡号去除空格
function unbankCardFormat(str) {
  return str.replace(/\s+/g, '')
}

class SignXloan extends Component {
  constructor(props) {
    super(props);
    this.setState={
      isBind:false
    }
  }
  render() {
    if(this.state.isBind){
      return (
        <Sign ></Sign >
      )
    }else{
      return (
        <Bindbank ></Bindbank>
      )
    }
  }
}

export default SignXloan; 