import Backbone from 'backbone';
import Order from '../models/order';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.orderTemplate = params.orderTemplate;
    this.listenTo(this.model, "update", this.render);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);

    return this;
  }, //end of render
  events: {
    'click button.alert': 'addOrderBuy',
    'click button.success': 'addOrderSell',
  },
  addOrderSell(event) {
    event.preventDefault();
    const orderData = {};
    ['symbol', 'price-target'].forEach( (field) => {
    const val = this.$(`#add-order-form input[name=${field}]`).val();
    if (val != '') {
      orderData[field] = val;
    }
  });
  const newOrder = new Order(orderData);
    this.model.add(newOrder);
    this.trigger('listOrders', this);
  },
}); // end of OrderView

export default OrderView;
