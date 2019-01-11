import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import { localParam } from "../api/serch.js"
import { getLoanInfo, postConfirm} from '../api/index.js'
import { Slider, Radio } from 'antd'

//借款金额
function LoanMoney(props) {
  return (
    <div className="loan_money_top">
      <p className="loan_max">最高可提取{props.amount}元</p>
      <div className="loan_input">
        <input value={props.moneyValue} onChange={props.moneyChange} placeholder="请输入借款金额" />
      </div>
      <SliderLine cut={props.cut} add={props.add} max={10000} value={props.moneyValue} sliderMoneyChange={props.sliderMoneyChange}></SliderLine>
    </div>
  )
}
//滑动条
function SliderLine(props) {
  return (
    <section>
      <div className="slider_line">
        <span className="slider_reduce" onClick={props.cut}>-</span>
        <Slider defaultValue={30} onChange={props.sliderMoneyChange} value={typeof props.value === 'number' ? props.value : 0} min={1000} max={props.max} />
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
        {
          props.periods.map((item, index) => {
            return <span data-value={item} className={props.index == item ? "ative" : ''} key={index} onClick={props.onClick} >{item}期</span>
          })
        }
      </div>
      <div className="periods_bottom">
        <span>每月应还{props.forMonth}</span>
        <span>一次性费用{props.loanCostAll}</span>
      </div>
    </div>
  )
}

//合同列表
function ContractList(props) {
  return (
    <div className="contract">
      <Radio checked={true}></Radio>同意
      {props.showProtocol ? props.loanContractList.map((item, index) => {
        if (index < 2) {
          return <Link to={item.url} key={index}>{item.name}</Link>
        } else {
          return;
        }
      })
        : props.loanContractList.map((item, index) => {
          return <Link to={item.url} key={index}>{item.name}</Link>
        })}
      {props.showProtocol ? <span> <span>及相关借款协议，查看其他签署协议</span><span onClick={props.showPro}>点击前往</span></span>:''

        }
    </div>
  )
}

class ConfirmLoan extends Component {
  constructor(props) {
    super(props);
    let { search } = localParam(this.props.history.location.search);
    this.state = {
      ...search,
      xloanPeriods: [12], //借款期限
      po: {
        applyAmount: {}, //贷款金额
        applyPeriod: '', //借款期限
        applyStatus: "", //状态·
        feerate: 12, //利率
        financeFeeRate: {}, //融资服务费率
        riskFeeRate: {},// 风险准备金率
        loanContractList: [] //合同列表
      },
      forMonth: "",
      loanCostAll: "",
      amount: "",
      showProtocol:true,
      vo:{
        agree:true,
        moneyValue: 1000,
        periodsIndex: "12",
        applyId:"",
        os:""
      }

    }
  }
  componentDidMount() {
    this.getLoanInfo()
  }
  render() {
    return (
      <div className="confirm_loan">
        <LoanMoney moneyValue={this.state.vo.moneyValue} moneyChange={(e) => this.moneyChange(e)} sliderMoneyChange={e => this.sliderMoneyChange(e)} add={(e) => this.moneyAdd(e)} cut={(e) => this.moneyCut(e)} amount={this.state.amount}></LoanMoney>
        <Periods index={this.state.vo.periodsIndex} periods={this.state.xloanPeriods} onClick={this.periodsClick.bind(this)} forMonth={this.state.forMonth} loanCostAll={this.state.loanCostAll}></Periods>
        <ContractList loanContractList={this.state.po.loanContractList} showProtocol={this.state.showProtocol} showPro={(e)=>this.showPro(e)}></ContractList>
        <div className="submit_btn" onClick={(e)=>this.confirm(e)}>
          下一步
        </div>
      </div>
    )
  };
  //输入借款金额
  moneyChange(e) {
    let val = e.target.value;
    this.setState({
      vo:{
        ...this.state.vo,
        moneyValue: val
      }
    })
    this.setState({  });
    this.computeLoan()
  };
  //滑动改变借款金额
  sliderMoneyChange(e) {
    this.setState({
      vo: {
        ...this.state.vo,
        moneyValue: e
      }
    })
    this.computeLoan()
  };
  //点击减少借款金额
  moneyCut(e) {
    this.setState((state) => {
      let val = state.vo.moneyValue - 100;
      return {
        vo: {
          ...this.state.vo,
          moneyValue: val
        }
      }
    })
    this.computeLoan()
  }
  //点击增加借款金额
  moneyAdd(e) {
    this.setState((state) => {
      let val = state.vo.moneyValue + 100;
      return {
        vo: {
          ...this.state.vo,
          moneyValue: val
        }
      }
    })
    this.computeLoan()
  }
  //选择期数
  periodsClick(e) {
    let index = e.target.dataset.value;
    this.setState((state) => {
      return {
      vo: {
        ...this.state.vo,
        periodsIndex: index
      }
      }
    })
    this.computeLoan()
  }
  //获取用户贷款信息
  async getLoanInfo() {
    let { data, status } = await getLoanInfo({ applyId: this.state.apply_id });
    if (status === 0) {
      let loanData = data;
      for (let keys in loanData) {
        if (typeof loanData[keys] !== 'object') {
          loanData[keys] = JSON.parse(loanData[keys])
        }
      }
      let xloanPeriods = Object.keys(loanData.applyAmount).map(item => parseInt(item, 10)).sort((a, b) => { return a - b });
      this.setState({
        ...this.state,
        xloanPeriods,
        po: {
          ...loanData
        }
      });
      this.computeLoan()
    }

  }
  //计算用户变更金额、期限后相关的计算
  computeLoan() {
    let loanData = this.state.po;
    //当前期数申请额度
    let amount = this.state.po.applyAmount[this.state.vo.periodsIndex];
    // 当前期数利率 
    let feerate = this.state.po.financeFeeRate[this.state.vo.periodsIndex] / 100;
    // 当前期数风险准备金
    let riskFeeRate = this.state.po.riskFeeRate[this.state.vo.periodsIndex] / 100;
    //服务费  贷款金额 * 风险准备金率
    let loanCostAll = (this.state.vo.moneyValue * riskFeeRate).toFixed(2);

    //每月应还
    let total = this.total(8.5 / 100, this.state.vo.periodsIndex * 1, this.state.vo.moneyValue).toFixed(2)

    let forMonth = (total * 1).toFixed(2);
    this.setState({
      forMonth,
      loanCostAll,
      amount
    })
  }
  /**
    计算本息
    rate:利率
    term：期数
    amount：金额
    */
  total(rate, term, amount) {
    let v = (1 + (rate / 12)),
      t = (-(term / 12) * 12),
      result = (amount * (rate / 12)) / (1 - Math.pow(v, t))
    return result;
  }
  //展示合同
  showPro(){
    this.setState((state)=>{
      return{
        showProtocol: !state.showProtocol
      }
    })
  }
  //确认借款
  async confirm(){
    let {data,status} = await postConfirm({
      applyPeriod: this.state.vo.periodsIndex,
      applyAmount: this.state.vo.moneyValue * 1,
      applyId: this.state.apply_id,
      os: this.state.clientType
    })
    console.log(data, status)
    if(status===1001){

    }
    if(status === 0){
      
    }
  }
}

export default ConfirmLoan;