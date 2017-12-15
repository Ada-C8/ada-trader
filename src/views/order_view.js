import Backbone from 'backbone';
import Order from '../models/order';
import _ from 'underscore';

const OrderView = Backbone.View.extend({
  initialize(params)  {
    this.template = params.orderTemplate,
    this.bus = this.bus,
    this.listenTo(this.model, 'change', this.render)
  },

  render() {
    const compiledOrderTemplate = this.orderTemplate(this.model.toJSON())
    this.$el.html(compiledTemplate);
    return this
  }
});

export default OrderView;

//right now I have OrderView able to initialize a single view of an order and render it;
