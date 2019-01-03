import React, { Component } from "react";
import "./style.scss";


function Bindbank() {
  return (
    <div>
      <ul>
        <li>
          <p>银行卡号</p>
          <div>
            请输入银行卡号
          </div>
        </li>
        <li>
          <p>开户省份</p>
          <div>
            请选择开户省份
          </div>
        </li>
        <li>
          <p>开户城市</p>
          <div>
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
      <div>
        <p> 温馨提示：</p>
        <p>1.请确保银行卡预留手机号与注册手机号一致</p>
        <p>2.请确保绑定的银行卡为本人名下借记卡</p>
        <p>3.绑定的银行卡将作为放款和还款的指定银行卡</p>
      </div>
      <div>
        绑定银行卡
      </div>
    </div>
  )
}

class SignXloan extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Bindbank></Bindbank>
    )
  }
}

export default SignXloan; 