import $ from 'jquery';
import _ from 'underscore';

import Backbone from 'backbone';
import Quote from '../models/quote';

const tradeTemplate = _.template($('#trade-template').html());

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'change', this.render);
    this.bus = params.bus;
    this.listenTo(this.bus, `buyMe${this.model.get('symbol')}`, this.buyQuote);
    this.listenTo(this.bus, `sellMe${this.model.get('symbol')}`, this.sellQuote);
  },
  render() {
    const template = this.template(this.model.toJSON());
    this.$el.html(template);
    return this;
  },
  events: {
    'click button.btn-buy': 'buyQuote',
    'click button.btn-sell': 'sellQuote'
  },
  buyQuote: function() {
    const quote = this.model.attributes;
    quote['buy'] = true;
    this.model.buy();
    $('#trades').prepend(tradeTemplate(quote));
    this.bus.trigger(`${this.model.attributes.symbol}${this.model.attributes.buy}orderFinished`, this);
  },
  sellQuote: function(e) {
    const trade = this.model.attributes;
    trade['buy'] = false;
    this.model.sell();
    $('#trades').prepend(tradeTemplate(trade));
    this.bus.trigger(`${this.model.attributes.symbol}${this.model.attributes.buy}orderFinished`, this);
  },

});

export default QuoteView;
