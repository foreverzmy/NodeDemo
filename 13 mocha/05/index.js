// 分账时计算小费
function addPercentageToEach(prices, percentage) {
  return prices.map(total => {
    total = parseFloat(total);
    return total + (total * percentage);
  })
}

function sum(prices) {
  return prices.reduce((currentSum, currentVal) => {
    return parseFloat(currentSum) + parseFloat(currentVal);
  })
}

function percentFormat(percentage) {
  return parseFloat(percentage) * 100 + '%';
}

function dollarFormat(number) {
  return '$' + parseFloat(number).toFixed(2);
}

module.exports = {
  addPercentageToEach,
  sum,
  percentFormat,
  dollarFormat
}