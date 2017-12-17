import Backbone from 'backbone';

import Order from '../models/order';




const OrderFormView = Backbone.View.extend({
  initialize(params){
    this.form = params.form;
    this.bus = params.bus;
  },
  // quoteData.each((quote) => {
  //   $('#dropdown').append(`<option>${quote.symbol}</option>`);
  // }),

  readOrderFormData(type) {
    const orderData = {};

    const $inputSymbolValue = this.$(`select[name="symbol"]`).val();
    const $inputPriceTargert = this.$(`input[name="price-target"]`)


    const priceValue = parseFloat($inputPriceTargert.val()).toFixed(2);
    console.log(`priceValue = ${priceValue}`);

    // Don't take empty strings, so that Backbone can
    // fill in default values
    orderData['symbol'] = $inputSymbolValue;
    if (priceValue != '') {
      orderData['targetPrice'] = priceValue;
    }
    orderData['buy'] = type
    $inputPriceTargert.val('');
    return orderData;
  },
  events: {
    'click button.btn-buy': 'buyOrder',
    'click button.btn-sell': 'orderSell',
  },
  buyOrder(event) {
    event.preventDefault();
    console.log('test click order');
    let orderObject = this.readOrderFormData(true)
    
    this.bus.trigger('newOrder', orderObject)
  },

  orderSell(event) {
    event.preventDefault();
    console.log('test click orderSell');
    let orderObject = this.readOrderFormData(false);
    this.bus.trigger('newOrder', orderObject)
  }

});
export default OrderFormView;
