import  State from "./state.js"
function setDemoOne(state = State.demoOne, action) {
    const { counterCaption } = action
    switch (action.type) {
      case 'increment':
        return { ...state, [counterCaption]: state[counterCaption] + 1 }
      case "decrement":
        return { ...state, [counterCaption]: state[counterCaption] - 1 }
      default:
        return state
    }
}

export {setDemoOne};