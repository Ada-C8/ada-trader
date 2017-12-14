import Backbone from 'backbone';
import OpenOrderView from './open_order_view';
import OpenOrder from '../models/open_order'

const OpenOrderListView = Backbone.View.extend({
  initialize(params){
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'update', this.render)
    this.listenTo(this.bus, 'dropDown', this.makeDropDown);
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
      console.log(openOrderView.render().$el);
      this.$('#orders').append(openOrderView.render().$el);
    });
    return this
    //this.listenTo(quoteView, 'buy_me', this.buy);
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
  //
  // events: {
  //   'click button.btn-buy': 'buyOpenOrder',
  //   'click button.btn-sell': 'sellOpenOrder'
  // },

  buyOpenOrder(event){
    event.preventDefault();
    // let price = this.$('form input[price-target]').val;
    // console.log(price)
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
      // this.updateStatusMessageFrom(newOpenOrder.validationError);
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


});

export default OpenOrderListView;
