import Backbone from 'backbone';
import Order from '../models/order';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
  },

  events: {
    'click button.btn-cancel': 'cancelOrder',
  },

  render() {
    // console.log('This is my render function in order view')
    const compiledTemplate = this.template(this.model.toJSON());
    // console.log(compiledTemplate);
    this.$el.html(compiledTemplate);
    return this;
  },

  cancelOrder(event) {
    // TRIGGERS ORDER LIST VIEW TO RE RENDER
    this.model.destroy();
    this.remove();
  },
});

export default OrderView;
