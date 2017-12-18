import Order from 'models/order';

describe('Order spec', () => {
  let buyOrder;
  let sellOrder;
  beforeEach(() => {
    buyOrder = new Order({
      symbol: 'HELLO',
      targetPrice: 90.00,
      marketPrice: 100.00,
      buy: true
    });
    sellOrder = new Order({
      symbol: 'HELLO',
      targetPrice: 100.00,
      marketPrice: 90.00,
      buy: false
    })
  });

  describe('Order validations', () => {
    it('is not valid unless it has a symbol', () => {

      expect(buyOrder.isValid()).toBeTruthy();

      expect(sellOrder.isValid()).toBeTruthy();

      buyOrder.set('symbol', null);

      expect(buyOrder.isValid()).toBeFalsy();

      sellOrder.set('symbol', null);

      expect(sellOrder.isValid()).toBeFalsy();
    })

    it('is not valid unless it has a numerical targetPrice', () => {
      expect(buyOrder.isValid()).toBeTruthy();

      expect(sellOrder.isValid()).toBeTruthy();

      const badTargetPrices = [null, 'strings', '.', '-1']

      badTargetPrices.forEach(function(element) {

        buyOrder.set('targetPrice', element);

        sellOrder.set('targetPrice', element);

        expect(buyOrder.isValid()).toBeFalsy();

        expect(sellOrder.isValid()).toBeFalsy();
      })
    })

    it('must follow buy low, sell high', () => {
      expect(buyOrder.isValid()).toBeTruthy();

      expect(sellOrder.isValid()).toBeTruthy();

      buyOrder.set('targetPrice', '110');

      sellOrder.set('targetPrice', '80');

      expect(buyOrder.isValid()).toBeFalsy();

      expect(sellOrder.isValid()).toBeFalsy();

    })
  });

  describe('Execute order', () => {
    it('triggers a "buy" event on itself if new buyOrder is valid', () => {
      const changeInfo = {symbol: 'HELLO', buy: true, currentPrice: 80}
      spyOn(buyOrder, "trigger")
      buyOrder.executeOrder(changeInfo)

      expect(buyOrder.trigger).toHaveBeenCalledWith('buy', changeInfo);
    });

    it('triggers a "sell" event on itself if new sellOrder is valid', () => {
      const changeInfo = {symbol: 'HELLO', buy: false, currentPrice: 110}
      spyOn(sellOrder, "trigger")
      sellOrder.executeOrder(changeInfo)

      expect(sellOrder.trigger).toHaveBeenCalledWith('sell', changeInfo);
    });
  });
});
