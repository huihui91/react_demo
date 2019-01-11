import React, { Component } from "react";
import "./style.scss";
import { Picker, InputItem } from 'antd-mobile';
import { getDictionary, postBankInfo, postBoundBankCards} from "../api/index.js";
import { localParam } from "../api/serch.js"

//绑卡
function Bindbank(props) {
  return (
    <div className="bind_bank">
      <ul>
        <li>
          <p>银行卡号</p>
          <label>
            <InputItem className="bank_input" type="bankCard"  placeholder="请输入银行卡号" onBlur={props.blur}></InputItem>
          </label>
        </li>
        <li>
          <p>开户省份</p>
          <Picker data={props.district} cols={1} className="forss" onOk={props.determine}>
          <label className="arrow">
              <div>
              {props.provinceName}
            </div>
          </label>
          </Picker>
        </li>
        <li>
          <p>开户城市</p>
          <Picker data={props.cityListData} cols={1} className="forss" onOk={props.cityDetermine}>
          <label className="arrow">
            <div>  {props.cityName}</div>
          </label>
          </Picker>
        </li>
        <li>
          <p>开户银行</p>
          <label>
            <div>{props.bankName}</div>
          </label>
        </li>
        <li>
          <p>手机号</p>
          <label>
            <div>
              {props.phone}
            </div>
          </label>
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
    let search = localParam().search;
    this.state = {
      isBind: false,
      po: {
        cardNo: '',
        bankId: '',
        phoneNo: '' || search.phone,
        validateCode: '',
        bankName: '请先输入银行卡号',
        cityId: '',
        cityName: '请选择开户城市',
        provinceId: '',
        provinceName: '请选择开户省份',
        applyId: ''
      },
      vo: {
        cityList: [],
        cityListData: [{ value: '', label:'请选择开户省份'}],
        provinceList: [],
        signHasCity: true,
        fundType: ''||search.fundType, //开户类型
        cgStatus: '' || search.cgStatus, //判断是否开户
      },
    }
  }
  componentWillMount(){

    this.getBoundBankCards()
  }
  render() {
    if (this.state.isBind) {
      return (
        <Sign phone={this.state.po.phoneNo}></Sign >
      )
    } else {
      return (
        <Bindbank district={this.state.vo.cityList} determine={(e) => this.determine(e)} cityDetermine={e => this.cityDetermine(e)} provinceName={this.state.po.provinceName} cityName={this.state.po.cityName} cityListData={this.state.vo.cityListData} bankName={this.state.po.bankName} blur={(e) => this.inputBlur(e)}></Bindbank>
      )
    }
  }
  //获取直辖市、省份信息
  async getBankDictionary(){
    let { data, status } = await getDictionary();
     if(status === 0){
       let cityList = data.provinceList.map(item=>{
         return { value: item.provinceId, label: item.provinceName, children: item.cityList}
       })
       this.setState({
         vo:{
           ...this.state.vo,
           cityList
         }
       })
     }
  }
  //省份确认
  determine(e){
   let provinceName= this.state.vo.cityList.filter((item) => { return item.value ===e[0]});
    let citys = provinceName[0].children.map(item=>{
      return{
        value: item.cityId,
        label: item.cityName
      }
    })
    this.setState({
      po:{
        ...this.state.po,
        provinceId:e[0],
        provinceName: provinceName[0].label
      },
      vo:{
        ...this.state.vo,
        cityListData: citys
      }
    })
  }
  //城市确认
  cityDetermine(e){
    let name = this.state.vo.cityListData.filter((item) => { return item.value === e[0] });
    this.setState({
      po:{
        ...this.state.po,
        cityId: e[0],
        cityName: name[0].label
      }
    })
  }
  //获取银行卡开户行
   async getBankInfo(){
     let { data, status } = await postBankInfo({ cardNo:this.state.po.cardNo});
     if(status === 0){
       this.setState({
         po:{
           ...this.state.po,
           bankName: data.bankName,
           bankId: data.bankId
         }
       })
     }
  }
  //银行卡输入blur
  inputBlur(e){
    let cardNo = unbankCardFormat(e);
    if (cardNo && cardNo.length>=16){
      this.setState({
        po: {
          ...this.state.po,
          cardNo,
        }
      })
      this.getBankInfo()
    }

  }
  //获取绑卡信息
  async getBoundBankCards(){
    let {data,status} = await postBoundBankCards();
    console.log(data, status)
    if(status === 0){
      if (data.bankCardList.length ===0){
        this.setState({
          isBind: true
        });
        this.getBankDictionary();
      }else{
        this.setState({
          isBind:true
        })

      }

    }
  }
}

export default SignXloan; 