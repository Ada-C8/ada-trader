import Backbone from 'backbone';
import LimitOrder from '../models/limit_order';
import TradeView from './trade_view';
import QuoteListView from './quote_list_view';
import LimitOrderList from '../collections/limit_order_list';
import LimitOrderView from './limit_order_view';

const LimitOrderListView = Backbone.View.extend({
  initialize(params){
    console.log(params);
    console.log('these are the params');
    this.template = params.template;
    this.hamRadio = params.hamRadio;
    this.dropdownTemplate = params.dropdownTemplate;
    // debugger;
    this.listenTo(this.hamRadio, 'render_order_dropdown', this.renderOrderDropdown);
    this.listenTo(this, 'order_purchase', this.addLimitOrder);
    this.listenTo(this, 'order_sell', this.addLimitOrder);
    this.listenTo(this.model, 'update', this.render);
  },
  events:{
    'click form button.btn-buy': 'addLimitOrder',
    'click form button.btn-sell': 'addLimitOrder',
  },
  updateStatusMessageFrom(messageHash) {
    const $statusMessages = this.$('#status-messages');
    $statusMessages.empty();
    Object.keys(messageHash).forEach((messageType) => {
      messageHash[messageType].forEach((message) => {
        $statusMessages.append(`<li>${message}</li>`);
      });
    });
    $statusMessages.show();
  },
  updateStatusMessage(message) {
    this.updateStatusMessageFrom({
      'Limit Order': [message],
    });
  },
  renderOrderPurchase(buyBoolean){
    console.log('banana nut bread');
    const newLimitOrder = new LimitOrder({symbol: model.attributes.symbol, price: model.attributes.price, buy: buyBoolean[buy]});

    if(newLimitOrder.isValid()){
      this.model.add(newLimitOrder);
      this.updateStatusMessage(`${newLimitOrder.get('symbol')} Created!`);
    }else{
      console.log('Something went wrong!');
      this.updateStatusMessageFrom(newLimitOrder.validationError);
    }
    return newTrade;
  },
  renderOrderSale(){

    const limitOrder = new LimitOrder({symbol: model.attributes.symbol, price: model.attributes.price});
    console.log(limitOrder);

    if(limitOrder.isValid()){
      this.model.add(limitOrder);
      this.updateStatusMessage(`${limitOrder.get('symbol')} Created!`);
    }else{
      console.log('Something went wrong!');
      this.updateStatusMessageFrom(limitOrder.validationError);
    }
    return limitOrder;
  },
  render() {

    this.$('#orders').empty();
    console.log('This is the limit order view model:' + this.model);
    // debugger
    this.model.each((order) => {
      console.log(order);
      console.log(this.template);
      const limitOrderView = new LimitOrderView({
        model: order,
        template: this.template,
        tagName: 'li',
        className: 'order'
      });
      this.$('#orders').prepend(limitOrderView.render().$el);
    });

    return this;
  },
  renderOrderDropdown(symbols){
    // debugger;
    this.$('#dropdown').empty();
    console.log(symbols);
    console.log('this is event');

    for( let symbol of symbols){
      // debugger
      let optionSymbol = symbol;

      this.$('#dropdown').append(`<option value=${optionSymbol}> ${optionSymbol} </option>` );
    };
    return this;
  },
  getFormData(){
    const orderData = {};
    const targetPrice =
    this.$(`#create-order input`).val();
    if (targetPrice !== '') {
      orderData['targetPrice'] = parseFloat(targetPrice);
    };
    const targetSymbol =  this.$( `#create-order select`).val();
    if (targetPrice !== '') {
      orderData['symbol'] = targetSymbol;
    };
    return orderData;

  },
  clearFormData() {
    this.$(`#create-order input[name="price-target"]`).val('');
  },

  addLimitOrder(event) {
    event.preventDefault();
    console.log('cake');
    const formData = this.getFormData();
    // formData['buy'] = event['buy'];
    const newLimitOrder = new LimitOrder(formData);
    if (newLimitOrder.isValid()) {
      this.model.add(newLimitOrder);
      this.clearFormData();
      console.log(newLimitOrder);
      console.log('that is a new limit order ');
      this.updateStatusMessage(`${newLimitOrder.get('symbol')} Limit Order Created!`);
    }
    else {
      console.log('ERROR');
      this.updateStatusMessageFrom(newTask.validationError);
      newTask.destroy();
    }
  },

});

export default LimitOrderListView
