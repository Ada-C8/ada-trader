import Backbone from 'backbone';
import Quote from 'models/quote';

const QuoteList = Backbone.Collection.extend({
  model: Quote,
  symbols() {
    let symbols = [];
    this.each((quote) => {
      symbols.push(quote.get('symbol'));
    });
    return symbols;
  }
});

export default QuoteList;
