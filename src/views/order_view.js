import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.order = params.model;
    this.quote = this.order.attributes.quote[0];
    this.listenTo(this.quote, 'change', this.executeTrade);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  executeTrade() {
    if (this.quote.get('price') >= this.order.get('priceTarget') && !this.order.get('buy')) { // TODO: Figure out why it sells below selling price. ex: sell @ 90, sold @ 89.7
      this.stopListening();
      this.quote.sell();
      this.order.destroy();
      this.remove();
    } else if (this.quote.get('price') <= this.order.get('priceTarget') && this.order.get('buy')) {
      this.stopListening();
      this.quote.buy();
      this.order.destroy();
      this.remove();
    }
  }
});

export default OrderView;
