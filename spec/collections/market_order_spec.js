import MarketOrder from 'collections/market_order';

describe('MarketOrder spec', () => {
  let marketOrder;
  beforeEach(() => {
    marketOrder = new MarketOrder({  });
  });

  describe('Instantiation', () => {
    it('can be instantiated', () => {

      expect(marketOrder).toBeTruthy;
      expect(marketOrder).toBeDefined;
    });
    it('must have a model', () =>{
      expect(marketOrder.get('model')).toBeDefined;
      // expect(marketOrder.get('model')).toEqual(Trade);
    });
    // it('must be a type of MarketOrder', () =>{
    //   expect(marketOrder).
    // });
  });

});
