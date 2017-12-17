import Backbone from 'backbone';
import QuoteView from '../views/quote_view'

import Quote from '../models/quote';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
    this.bus = params.bus;
  },
  render() {
    this.$('#quotes').empty();
    console.log('in quotelistview render');
    console.log(this.model)
    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        tagName: 'li',
        className: 'quote',
        bus: this.bus,
      });
      this.$('#quotes').append(quoteView.render().$el);
      // pass the quotelist to the open order view
      this.bus.trigger('current_quote_list', this.model)

    });
    // symbols is a custom function in the collection that returns an array of models' symbols
    let quotes = this.model.symbols();
    this.bus.trigger('quote_symbols', quotes);
    return this;
  },
});

export default QuoteListView;
