import Backbone from 'backbone';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.bus, `priceChange${this.model.get('symbol')}`, this.attemptTrade);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  attemptTrade(price) {
    if (this.model.get('buy')) {
      if (parseFloat(price) <= this.model.get('targetPrice')) {
        const trade = {
          symbol: this.model.get('symbol'),
          buy: this.model.get('buy'),
          price: parseFloat(price),
        };
        this.model.destroy();
        this.stopListening();
        this.bus.trigger('addTrade', trade);
      }
    } else {
      if (this.model.get('targetPrice') <= parseFloat(price)) {
        const trade = {
          symbol: this.model.get('symbol'),
          buy: this.model.get('buy'),
          price: parseFloat(price),
        };
        this.model.destroy();
        this.stopListening();
        this.bus.trigger('addTrade', trade);
      }
    }
  },
});

export default OrderView;
