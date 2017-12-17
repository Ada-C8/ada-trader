import Backbone from 'backbone';
import Quote from 'models/quote';

const QuoteList = Backbone.Collection.extend({
  model: Quote,

  bySymbol: function(symbol) {
    const filtered = this.filter(function (quote) {
      return quote.get('symbol') === symbol;
    });
    return filtered[0];
  },
});

export default QuoteList;
