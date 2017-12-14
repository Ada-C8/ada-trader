import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    // this.orderListOptionTemplate = _.template($('#order-list-option-template').html());
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
    },
    'click .btn-sell': function() {
      let trade = this.model.sell();
    },
  },
});

export default QuoteView;
