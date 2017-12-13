import Backbone from 'backbone';
import Order from '../models/order';
import _ from 'underscore';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.quote = this.model.attributes.quote[0];
    console.log(this.model.attributes.quote[0]);
    console.log(this.quote);
    // this.listenTo(this.model, 'change', this.render);
    // this.quote = params.quote

    this.listenTo(this.quote, 'change', this.checkPrice);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  checkPrice() {
    if (this.model.attributes.buy) {
      if (this.model.attributes.targetPrice <= this.quote.attributes.price) {
        this.trigger('buyOrder', this);
      }
    } else {
      if (this.model.attributes.targetPrice >= this.quote.attributes.price) {
        this.trigger('buyOrder', this);
      }
    }
  }
})

export default OrderView;
