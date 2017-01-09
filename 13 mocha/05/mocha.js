require('should');
const tips = require('./index');

describe('AA制时计算小费', () => {
  let tax = 0.12;
  let tip = 0.15;
  let prices = [10, 20];
  let priceWithTipAndTax = tips.addPercentageToEach(prices, tip + tax);

  it('priceWithTipAndTax[0]', () => {
    priceWithTipAndTax[0].should.equal(12.7);
  });
  it('priceWithTipAndTax[1]', () => {
    priceWithTipAndTax[1].should.equal(25.4);
  });

  describe('Total', () => {
    let totalAmount = tips.sum(priceWithTipAndTax).toFixed(2);
    it('totalAmount', () => {
      totalAmount.should.equal('38.10');
    });
    it('totalAmountAsCurrency', () => {
      let totalAmountAsCurrency = tips.dollarFormat(totalAmount);
      totalAmountAsCurrency.should.equal('$38.10');
    });
    it('tipAsPercent', () => {
      let tipAsPercent = tips.percentFormat(tip);
      tipAsPercent.should.equal('15%');
    })
  })
});