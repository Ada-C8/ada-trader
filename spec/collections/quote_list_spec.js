import QuoteList from 'collections/quote_list';
import Quote from 'models/quote';

describe('QuoteList spec', () => {
  let quoteList;
  beforeEach(() => {
    quoteList = new QuoteList([
        {
          symbol: 'ANDERS',
          price: 90.01,
        },
        {
          symbol: 'CHEN',
          price: 73.45,
        },
      ]);
    });

  describe('QuoteList', () => {
    it('should be a list of Quote models', () => {
      console.log('************');

      let quoteList2 = new QuoteList();
      let quote = new Quote ({
        symbol: 'ANDERS',
        price: 90.01,
      });

      quoteList2.add(quote);
      expect(quoteList2.at(0).get('symbol')).toEqual('ANDERS');
    });
  });

  describe('allSymbols function', () => {
    it('should return an Array of strings', () => {
      expect(quoteList.allSymbols()).toEqual(['ANDERS', 'CHEN']);
    });
  });
});
