import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
// import quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'change', this.render);

    this.tradeTemplate = _.template($('#trade-template').html());
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  events: {
    'click button.btn-buy': 'buyQuote',
    'click button.btn-sell': 'sellQuote',
  },
  buyQuote: function() {
    const addBuy = _.extend(this.model.toJSON(), {buy: true});
    $('#trades').prepend(this.tradeTemplate(addBuy));
    this.model.buy();
  },
  sellQuote: function() {
    const addSell = _.extend(this.model.toJSON(), {buy: false});
    $('#trades').prepend(this.tradeTemplate(addSell));
    this.model.sell();
  },
});

export default QuoteView;
