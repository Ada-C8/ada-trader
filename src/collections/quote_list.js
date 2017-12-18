import Backbone from 'backbone';
import Quote from 'models/quote';

const QuoteList = Backbone.Collection.extend({
  model: Quote,

  //custom method to get all symbols
  allSymbols(){
    const allSymbols = [];
    this.forEach(function(quote) {
      console.log(quote);
      allSymbols.push(quote.get('symbol'));
    });
    console.log(allSymbols);
    return allSymbols;
  },
});

export default QuoteList;
