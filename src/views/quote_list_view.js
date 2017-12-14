import Backbone from 'backbone';
import $ from 'jquery';

import QuoteView from '../views/quote_view';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.tradeTemplate = params.tradeTemplate;
    this.bus = params.bus,

    this.listenTo(this.model, 'update', this.render);
    this.listenTo(this.bus, 'addTrade', this.addTrade);
  },
  render() {
    // clear unordered list
    this.$('#quotes').empty();

    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        bus: this.bus,
        template: this.template,
        tagName: 'li',
        className: 'quote',
      });

      this.$('#quotes').append(quoteView.render().$el);
    });
    return this;
  },
  events: {
  },
  addTrade(quote) {
    console.log('in quote list');
    console.log(this);
    console.log(this.model);

    console.log('existing quote');
    console.log(quote);
    const tradeTemplate = this.tradeTemplate(quote.toJSON());
    $('#trades').prepend(tradeTemplate);
  },
});

export default QuoteListView;
