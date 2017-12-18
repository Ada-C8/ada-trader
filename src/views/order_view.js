import Backbone from 'backbone';
import Order from '../models/order';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.orderTemplate;
  },
  render() {
    console.log('in order_view render');
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  events: {
    'click button.btn-cancel': 'cancelOrder',
  },
  cancelOrder: function(event) {
    this.model.destroy();
    this.remove();
  }
});

export default OrderView;
