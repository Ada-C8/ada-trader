import Backbone from 'backbone';
import Order from '../models/order';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus; //listening for prices in quote model

    // this.listenTo(this.bus, 'create_new_order', this.render);
    this.listenTo(this.model, 'change', this.render); //listen for destory
    this.listenTo(this.bus, 'price_change', this.checkForPriceMatch);
  },

  checkForPriceMatch(model) {
    console.log('In checkForPriceMatch');
    console.log(model);
    console.log(this.model.get('symbol'));
    console.log(model.get('price').toFixed(2));
    console.log('TARGETPRICE!!!');
    console.log(this.model.get('targetPrice'));

    if (model.get('symbol') === this.model.get('symbol')) {
      console.log('HUMOR MATCH');
      console.log(this.model.get('buy'));

      if (this.model.get('buy')) {
        console.log('BUY IS TRUE');

        if (this.model.get('targetPrice') < model.get('price').toFixed(2)) {
          console.log('BUY');
          console.log(parseFloat(this.model.get('targetPrice')));

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
    console.log(this.model.targetPrice);
    console.log(this.model.attributes);

    //TODO: when I access attributes via this.model.attributes the targetPrice turns into a string? Workaround below

    const obj = {
      targetPrice: parseFloat(this.model.targetPrice),
      symbol: this.model.symbol,
      buy: this.model.buy,
    }

    const compiledTemplate = this.template(obj);
    this.$el.html(compiledTemplate);

    // const compiledTemplate = this.template(this.model.attributes);
    // this.$el.html(compiledTemplate);

    console.log('Template please?');
    console.log(compiledTemplate);

    return this;
  },

})

export default OrderView;
