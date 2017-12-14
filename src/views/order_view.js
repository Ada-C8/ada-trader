import Backbone from 'backbone';
import Order from '../models/order';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;

    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.bus, 'price_change', this.checkForPriceMatch);
  },

  checkForPriceMatch(model) {
    console.log('In checkForPriceMatch');
    console.log(model);

    if (model.get('symbol') === this.model.get('symbol')) {
      console.log('Symbol Match');

      if (this.model.get('buy')) {
        console.log('Buy attribute is true');

        if (this.model.get('targetPrice') >= model.get('price').toFixed(2)) {
          console.log('Executing buy order');

          const objectForTradeHistory = {
            model: model,
            buy: true,
            price: parseFloat(this.model.get('targetPrice')),
            symbol: this.model.get('symbol'),
          };

          this.bus.trigger('add_me_to_trade_hist', objectForTradeHistory);
          this.stopListening(); ///destroy alone doesn't stop the listener
          this.model.destroy();
        }
      } else {
        console.log('Buy attribute is false');

        if (this.model.get('targetPrice') <= model.get('price').toFixed(2)) {
          console.log('Executing sell order');

          const objectForTradeHistory = {
            model: model,
            buy: false,
            price: parseFloat(this.model.get('targetPrice')),
            symbol: this.model.get('symbol'),
          };

          this.bus.trigger('add_me_to_trade_hist', objectForTradeHistory);
          this.stopListening();
          this.model.destroy();
        }
      }
    }
  },

  destroyOrder(event) {
    console.log('In destroyOrder');
    this.model.destroy();
  },

  events: {
    'click button.btn-cancel': 'destroyOrder',
  },

  render(){
    console.log('In order view render:');

    //TODO: when I access attributes via this.model.attributes the targetPrice turns into a string? Workaround below

    const obj = {
      targetPrice: parseFloat(this.model.targetPrice),
      symbol: this.model.symbol,
      buy: this.model.buy,
    }

    const compiledTemplate = this.template(obj);
    this.$el.html(compiledTemplate);

    return this;
  },

})

export default OrderView;
