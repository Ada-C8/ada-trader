import Backbone from 'backbone';
import OpenOrderView from './open_order_view';
import OpenOrder from '../models/open_order'

const OpenOrderListView = Backbone.View.extend({
  initialize(params){
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'update', this.render)
    this.listenTo(this.bus, 'dropDown', this.makeDropDown);
    this.listenTo(this.bus, 'currentPrice', this.evaluatePrice);
  },

  render() {
    console.log('I am in OpenOrderListView render');
    this.$('#orders').empty();
    this.model.each((openOrder) => {
      const openOrderView = new OpenOrderView({
        model: openOrder,
        template: this.template,
        tagName: 'li',
        className: 'order',
        bus: this.bus
      });
      console.log("appending a new openOrder");
      // console.log(openOrderView)
      this.$('#orders').append(openOrderView.render().$el);
    });
    return this
  },

  events: {
    'click button.btn-buy': 'buyOpenOrder',
    'click button.btn-sell': 'sellOpenOrder'
  },

  makeDropDown(symbol_array) {
    //add options to select in order form
    for (let symbol of symbol_array) {
      this.$('.order-entry-form select[name=symbol]').append(`<option value='${symbol}'>${symbol}</option>`)
    };
  },

  buyOpenOrder(event){
    event.preventDefault();
    this.addOpenOrder(true);
    console.log('buy open order has been clicked')
  },

  sellOpenOrder(){
    event.preventDefault();
    this.addOpenOrder(false);
    console.log('sell open order has been clicked')
  },

  addOpenOrder(type) {
    console.log('I am in addOpenOrder')
    const formData = this.getFormData(type);
    const newOpenOrder = new OpenOrder(formData);
    if (newOpenOrder.isValid()) {

      console.log('I am a valid order')
      this.model.add(newOpenOrder);
      this.clearFormData();
    }
    else {
      console.log('ERROR');
      newOpenOrder.destroy();
    }
  },

  clearFormData() {
    this.$(`form select[name= 'symbol']`).val('');
    this.$(`form input[name= 'price-target']`).val('');
  },

  getFormData(type) {
    console.log("I am reading data")
    const orderData = {};
    const symbol_val = this.$(`form select[name= 'symbol']`).val();
    orderData['symbol'] = symbol_val;

    let price_val = this.$(`form input[name= 'price-target']`).val();
    price_val = parseFloat(price_val)
    orderData['targetPrice'] = price_val;
    orderData['buy'] = type
    console.log(orderData)
    return orderData;
  },

//Everytime the price of the quotes change, evaluate if any open orders should be bought or sold. To do this:
//1. Loop through all the orders to match the order and quote symbols
//2. Use .validTransation(quote) to check if a transaction should occur
//3.  If a transaction should happen, tell the quoteView to buy this quote and destroy the quote
  evaluatePrice(quote) {
    let quoteSymbol = quote.get('symbol')
    this.model.each((openOrder) => {
      if (openOrder.get('symbol') === quoteSymbol){
        let transaction = openOrder.validTransaction(quote)
        if (transaction =='buy') {
          this.bus.trigger('buyMe', openOrder);
          openOrder.destroy();
        };
        if (transaction =='sell'){
          this.bus.trigger('sellMe', openOrder);
          openOrder.destroy();
        }
      }
    });
  },
});

export default OpenOrderListView;
