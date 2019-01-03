import React, { Component } from "react";
import "./style.scss";
import { Slider, Switch } from 'antd'
import { Radio } from 'antd';

//借款金额
function LoanMoney(props) {
  return(
    <div className="loan_money_top">
      <p className="loan_max">最高可提取20000.00元</p>
      <div className="loan_input">
        <input placeholder="请输入借款金额" />
      </div>
      <SliderLine></SliderLine>
    </div>
  )
}
//滑动条
function SliderLine(props) {
    return (
      <section>
      <div className="slider_line">
        <span className="slider_reduce">-</span>
        <Slider defaultValue={30} />
        <span className="slider_add">+</span>
      </div>
      <div className="slider_range">
        <span className="slider_min">
          1000
        </span>
          <span className="slider_max">10000</span>
      </div>
      </section>

    )
}


//还款期数
function Periods(props) {
    return (
      <div className="periods">
        <p >还款期数</p>
        <div className="periods_items">
          <span className="ative">12期</span>
          <span>24期</span>
          <span>36期</span>
        </div>
        <div className="periods_bottom">
          <span>每月应还 1290.11</span>
          <span>一次性费用  0</span>
        </div>
      </div>
    )
}

//合同列表
function ContractList(props) {
  return(
    <div className="contract">
      <Radio checked={true}></Radio>同意
      <span>《借款合同》</span>
      <span>《代扣合同》</span>
    </div>
  )
}

class ConfirmLoan extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className="confirm_loan">
        <LoanMoney></LoanMoney>
        <Periods></Periods>
        <ContractList></ContractList>
        <div className="submit_btn">
          下一步
        </div>
      </div>
    )
  }
}

export default ConfirmLoan;