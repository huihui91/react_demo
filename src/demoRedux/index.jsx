import React,{ Component } from "react";

import { increment, decrement } from '../Redux/Actions'
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
        <button className="btn1" style={buttonStyle} onClick={e=>this.props.Increment(e)}>+</button>
        <button className="btn2"  style={buttonStyle} onClick={e=>this.props.Decrement(e)}>-</button>
     </section>
    )
  }

}

function mapStateToProps(state, ownProps) {
  return {
    value: state['First']
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    Increment: () => {
      dispatch(increment('First'))
    },
    Decrement: () => {
      dispatch(decrement('First'))
    }

  }
}



export default connect(mapStateToProps, mapDispatchToProps)(demoRedux)