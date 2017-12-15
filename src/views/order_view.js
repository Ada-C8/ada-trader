import Backbone from 'backbone';
import Quote from '../models/quote';
import Order from '../models/order';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
  },
  render() {
    const compiledTemplate = this.template(this.model.attributes);
    this.$el.html(compiledTemplate);
    return this;
  },
  events: {
    'click button.btn-cancel' : 'cancelOrder'
  },
  cancelOrder: function(e) {
    this.model.destroy();
  }
});

export default OrderView;
