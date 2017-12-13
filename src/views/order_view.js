import Backbone from 'backbone';
import Order from '../models/order';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.bus = params.bus;
    this.template = params.template;

    this.listenTo(this.model, 'change', this.priceChange);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());

    this.$el.html(compiledTemplate);

    return this;
  },
  events: {
    'click button.btn-cancel': 'cancelOrder',
  },
  cancelOrder() {
    this.model.destroy();
    this.remove();
  },
});

export default OrderView;
