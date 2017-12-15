import Backbone from 'backbone';
import _ from 'underscore';
import Quote from 'models/quote';

const QuoteListView = Backbone.View.extend ({
initialize(params) {
  this.template = params.template;
},
render() {
  //use the template
  const quoteHTML = this.template({
    symbol: this.model.get('symbol'),
    price: this.model.get('price'),
  });

  //append template to html
  this.$
  return this;
},
});

export default QuoteListView;
