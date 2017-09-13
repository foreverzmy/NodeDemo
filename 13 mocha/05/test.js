const should = require('should');
const tips = require('.');

// 定义税费和小费比例
let tax = 0.12;
let tip = 0.15;
// 定义要测试的账单项
let prices = [10, 20];

let priceWithTipAndTax = tips.addPercentageToEach(prices, tip + tax);

priceWithTipAndTax[0].should.equal(12.7);
priceWithTipAndTax[1].should.equal(25.4);

let totalAmount = tips.sum(priceWithTipAndTax).toFixed(2);
totalAmount.should.equal('38.10');

let totalAmountAsCurrency = tips.dollarFormat(totalAmount);
totalAmountAsCurrency.should.equal('$38.10');

let tipAsPercent = tips.percentFormat(tip);
tipAsPercent.should.equal('15%');