import Backbone from 'backbone';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  events: {
    'click #order-buy': 'buyOrder',
    'click #order-sell': 'sellOrder',
  },

  buyOrder() {
    this.model.buy();
    console.log('buy order placed!');
    const order = new Order({
      symbol: this.model.get('symbol'),
      buy: true,
      targetPrice: this.model.get('price-target'),
    });
    this.bus.trigger('addOrder', order);
  },

  sellOrder() {
    this.model.sell();
    console.log('sell order placed!');
    const order = new Order({
      symbol: this.model.get('symbol'),
      buy: false,
      targetPrice: this.model.get('price-target'),
    });
    this.bus.trigger('addOrder', order);
  },
});

export default OrderView;
