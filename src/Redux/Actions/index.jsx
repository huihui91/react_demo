export const Increment = 'increment'
export const Decrement = 'decrement'

export const increment = (counterCaption) => ({
    type: Increment,
    counterCaption
}
)
export const decrement = (counterCaption) => ({
  type: Decrement,
  counterCaption
})

export const demoworld = (counterCaption) => {
  console.log(counterCaption,'counterCaption')
  return {
  type: 'demo',
  data:counterCaption
}}