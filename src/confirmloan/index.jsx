import React, { Component } from "react";
import "./style.scss";
import { localParam} from "../api/serch.js"
import { Slider, Radio} from 'antd'

//借款金额
function LoanMoney(props) {
  return(
    <div className="loan_money_top">
      <p className="loan_max">最高可提取20000.00元</p>
      <div className="loan_input">
        <input value={props.moneyValue} onChange={props.moneyChange} placeholder="请输入借款金额" />
      </div>
      <SliderLine cut={props.cut} add={props.add}  max={10000} value={props.moneyValue} sliderMoneyChange={props.sliderMoneyChange}></SliderLine>
    </div>
  )
}
//滑动条
function SliderLine(props) {
    return (
      <section>
      <div className="slider_line">
          <span className="slider_reduce" onClick={props.cut}>-</span>
          <Slider defaultValue={30} onChange={props.sliderMoneyChange} value={typeof props.value === 'number' ? props.value : 0} min={1000} max={props.max}  />
        <span className="slider_add" onClick={props.add}>+</span>
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
          <span data-value="1" className={props.index==='1'?"ative":''} onClick={props.onClick} >12期</span>
          <span data-value="2" className={props.index === '2' ? "ative" : ''} onClick={props.onClick} >24期</span>
          <span data-value="3" className={props.index === '3' ? "ative" : ''} onClick={props.onClick} >36期</span>
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
    super(props);
    let {search}= localParam(this.props.history.location.search);
   this.state={
     ...search,
     moneyValue:1000,
     periodsIndex:'1'
   }
  }
  render(){
    return(
      <div className="confirm_loan">
        <LoanMoney moneyValue={this.state.moneyValue} moneyChange={(e) => this.moneyChange(e)} sliderMoneyChange={e => this.sliderMoneyChange(e)}add={(e)=>this.moneyAdd(e)} cut={(e)=>this.moneyCut(e)} ></LoanMoney>
        <Periods index={this.state.periodsIndex} onClick={this.periodsClick.bind(this)}></Periods>
        <ContractList></ContractList>
        <div className="submit_btn">
          下一步
        </div>
      </div>
    )
  };
  //输入借款金额
  moneyChange(e){
    let val=e.target.value;
    this.setState({ moneyValue:val})
  };
  //滑动改变借款金额
  sliderMoneyChange(e){
    this.setState({ moneyValue: e })
  };
  //点击减少借款金额
  moneyCut(e){
     this.setState((state)=>
       {
         let val=state.moneyValue-100;
       return{
         moneyValue: val
       }
    })
  }
  //点击增加借款金额
  moneyAdd(e){
       this.setState((state)=>
       {
         let val=state.moneyValue+100;
       return{
         moneyValue: val
       }
    })
  }
  //选择期数
  periodsClick(e){
    let index = e.target.dataset.value;
     this.setState((state)=>{
       return{
         periodsIndex:index
       }
     })
  }
  //获取用户贷款信息
  getLoanInfo(){
    
  }

}

export default ConfirmLoan;