import React,{ Component } from "react";

import { increment, decrement, demoworld} from '../Redux/Actions/index.jsx'
import { connect } from 'react-redux';
import "./style.scss";
const buttonStyle = {
  margin: "20px"
}


class demoRedux extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    return(
     <section>
        <div className="value">{this.props.value}</div>
        <div className="value">{this.props.text}</div>
        <button className="btn1" style={buttonStyle} onClick={e=>this.props.Increment(e)}>+</button>
        <button className="btn2"  style={buttonStyle} onClick={e=>this.props.Decrement(e)}>-</button>
        <button onClick={e => this.props.DemoWorld(e)} >World</button>
     </section>
    )
  }

}

function mapStateToProps(state, ownProps) {
  console.log(state,'state')
  return {
    value: state.setDemoOne['First'],
    text: state.setDemoTwo['demo']
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    Increment: () => {
      dispatch(increment('First'))
    },
    Decrement: () => {
      dispatch(decrement('First'))
    },
    DemoWorld:()=>{
      dispatch(demoworld('World'))
    }

  }
}



export default connect(mapStateToProps, mapDispatchToProps)(demoRedux)