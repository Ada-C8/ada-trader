import Backbone from 'backbone';
import _ from 'underscore';

import Quote from '../models/quote';
import QuoteView from '../views/quote_view';

const TradeHistoryView = Backbone.View.extend ({
  initialize(params) {
    this.template = params.template;
    // this.listenTo(this.model, 'change', this.render);
  },

  bind() {
    this.model.each((quote) => {
      this.listenTo(quote,'trade', this.renderHistory)
    });
  },

  renderHistory(data) {
    let compiledTemplate = this.template(data)
    this.$('#trades').prepend(compiledTemplate);

    return this;
  }
});

export default TradeHistoryView;
