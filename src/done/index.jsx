import React, { Component } from "react";
import "./style.scss";


function Sucess(params) {

  return (
    <div className="done_success">
      <img src={require('../assets/sucess.png')} alt="成功" />
      <div className="text">
        <p className="text_1">亲爱的用户</p>
        <p>您的存管开户成功</p>
      </div>
      <div className="btn">
        继续签约
      </div>
    </div>
  )
}
function Loade(props) {
  return (
    <div className="done_loade">
      <img src={require("../assets/fail.png")} alt="等待" />
      <div className="text">
        <p>存管银行正在处理您的申请 ，预计需要1~2分钟，请耐心等待</p>
      </div>
      <div className="btn">
        返回首页
      </div>
    </div>
  )
}

function Fail(props) {
  return (
    <div className="done_fail">
      <img src={require("../assets/fail.png")} alt="失败" />
      <div className="text">
        <p className="text_1">存管开户失败</p>
      </div>
      <div className="btn">
        重新开户
      </div>
    </div>
  )
}


//获取url中的query
function getQuery(query){
   let querys=query.split('?')[1].split('&');
   let queryObj={}
    for(let i=0;i<querys.length;i++){
      let key = querys[i].split('=')[0];
      let value = querys[i].split('=')[1];
      queryObj[key] = value;
    }
  return queryObj;
}

class Done extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fundType: '1'
    }
  };
 componentWillMount(){
   let fundType = getQuery(this.props.location.search).cgStatus;
   this.setState((state) => { return { fundType: fundType}})
 }
  render() {
    if (this.state.fundType === '1') {
      return <Loade></Loade>
    } else if (this.state.fundType === '2') {
      return <Sucess></Sucess>
    } else {
      return <Fail></Fail>

    }


  }
}

export default Done;