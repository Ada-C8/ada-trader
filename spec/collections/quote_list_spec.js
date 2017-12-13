import QuoteList from 'collections/quote_list';

describe('QuoteList spec', () => {
  let quoteList;
  beforeEach(() => {
    quoteList = new QuoteList({  });
  });

  describe('Instantiation', () => {
    it('can be instantiated', () => {

      expect(quoteList).toBeTruthy;
      expect(quoteList).toBeDefined;
    });
    it('must have a model', () =>{
      expect(quoteList.get('model')).toBeDefined;
      // expect(marketOrder.get('model')).toEqual(Trade);
    });
    // it('must be a type of MarketOrder', () =>{
    //   expect(marketOrder).
    // });
  });

});
