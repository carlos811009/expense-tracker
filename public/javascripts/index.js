const amount = document.querySelector('.amount')
const cash = document.querySelectorAll('.cash')
let money = 0
cash.forEach(c => {
  money += Number(c.innerHTML)
})
amount.innerHTML = money