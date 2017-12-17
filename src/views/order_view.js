import Backbone from 'backbone';
// import Order from '../models/order';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model.get('quote'), 'change', this.tradeOrder);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  events: {
    'click .btn-cancel': 'cancelOrder',
  },
  cancelOrder() {
    this.model.destroy();
    this.remove();
  },
  tradeOrder() {
    if (this.model.get('buy')) {
      if (this.model.get('quote').get('price') <= this.model.get('targetPrice')) {
        console.log(this);
        this.bus.trigger('buyOrder', this);
        this.cancelOrder();
      }
    } else {
      if (this.model.get('quote').get('price') >= this.model.get('targetPrice')) {
        this.cancelOrder();
      }
    }
  },
});

export default OrderView;
