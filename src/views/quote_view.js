import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.tradeTemplate = _.template($('#trade-template').html());

    this.listenTo(this.model, 'change', this.render);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  events: {
    'click button.btn-buy': function() {
      let trade = this.model.buy();
      $('#trades').prepend(this.tradeTemplate(trade));
    },
    'click .btn-sell': function() {
      let trade = this.model.sell();
      $('#trades').prepend(this.tradeTemplate(trade));
    },
  },
});

export default QuoteView;
