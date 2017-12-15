import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.order = params.model
    this.quote = this.order.attributes.quote[0];
    this.listenTo(this.quote, 'change', this.executeTrade);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  executeTrade() {
    if (this.quote.get('price') >= this.order.get('priceTarget') && !this.order.buy) {
      this.quote.sell();
      this.remove();
    } else if (this.quote.get('price') <= this.order.get('priceTarget') && this.order.buy) {
      this.quote.buy();
      this.remove();
    }
  }
  // events: {
  //   'click button.btn-buy': function() {
  //     let trade = this.model.buy();
  //   },
  //   'click .btn-sell': function() {
  //     let trade = this.model.sell();
  //   },
  // },
});

export default OrderView;
