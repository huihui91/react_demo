import State from "./state.js"
function setDemoTwo(state = State.demoTwo, action) {
  console.log(action,'action')
  switch (action.type) {
    case 'demo':
      return{
        ...state,
        demo:action.data
      };
    default: 
      return state;
  }
  
}

export {
  setDemoTwo
}