import Backbone from 'backbone';
import _ from 'underscore';
import Quote from '../models/quote';
import QuoteView from '../views/quote_view';

const TradeView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
  },

  helper(){
    this.model.each((quote)=> {
      this.listenTo(quote, "trade", this.render);
    });
  },
  render(data) {
    const compiledTemplate = this.template(data);
    this.$('#trades').prepend(compiledTemplate);

    return this;
  },
});

export default TradeView;
