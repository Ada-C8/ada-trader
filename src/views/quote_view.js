import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

import Quote from '../models/quote';
import Trade from '../models/trade';


const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, "change", this.render);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  events: {
    'click button.btn-buy': 'buyStock',
    'click button.btn-sell': 'sellStock',
  },
  buyStock: function() {
    this.model.buy();
    let tradeTemplate = _.template($('#trade-template').html());
    $('#trades').append(tradeTemplate(this.model.attributes));
  },
  sellStock: function() {
    this.model.sell();
    let tradeTemplate = _.template($('#trade-template').html());
    $('#trades').append(tradeTemplate(this.model.attributes));
  },

});

export default QuoteView;
