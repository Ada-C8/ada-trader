import Trade from 'models/trade';

describe('Trade spec', () => {

  describe('Validations', () => {

    it('must have a symbol', () => {
      let trade = new Trade({
        symbol: null,
        price: 100.00
      });
      expect(trade.valid).toBeFalsy();
    });

    it('must have a price', () => {

      let trade = new Trade({
        symbol: "HELLO",
        price: null
      });
      expect(trade.valid).toBeFalsy();
    });
  });
});
