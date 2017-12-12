import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

import Quote from '../models/quote';


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
    this.model.set('buy', true);

    let tradeTemplate = _.template($('#trade-template').html());
    $('#trades').append(tradeTemplate(this.model.attributes));
    this.model.buy();

  },
  sellStock: function() {
    this.model.set('buy', false);

    let tradeTemplate = _.template($('#trade-template').html());
    $('#trades').append(tradeTemplate(this.model.attributes));
    this.model.sell();

  },

});

export default QuoteView;
