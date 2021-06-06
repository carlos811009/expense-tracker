const amount = document.querySelector('.amount')
const cash = document.querySelectorAll('.cash')
let money = 0
cash.forEach(c => {
  money += Number(c.innerHTML)
})
amount.innerHTML = money

const month = document.querySelector('.select_month')



// function submit() {
//   month.addEventListener('click', event => {
//     const target = event.target
//     return target.value
//   })
// }