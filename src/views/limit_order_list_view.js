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
    this.listenTo(this.hamRadio, 'render_order_dropdown', this.renderOrderDropdown);
    this.listenTo(this, 'order_purchase', this.addLimitOrder);
    this.listenTo(this, 'order_sell', this.addLimitOrder);
    this.listenTo(this.model, 'update', this.render);
    this.listenTo(this.hamRadio, 'deleteOrder', this.deleteOrder)
  },
  events:{
    'click form button.btn-buy': 'addLimitOrder',
    'click form button.btn-sell': 'addLimitOrder',
    // 'click button.btn-cancel': 'cancelLimitOrder',
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
    let btnSell = event['target'].classList.contains('btn-sell')
    if( btnSell){
      orderData['buy'] = false;
    }
    return orderData;

  },
  clearFormData() {
    this.$(`#create-order input[name="price-target"]`).val('');
  },
  cancelLimitOrder(event){
    console.log(event);

  },
  addLimitOrder(event) {
    event.preventDefault();
    console.log('cake');
    const formData = this.getFormData();
    console.log(quotes);
    const formSymbol = formData['symbol'];

    // const foundQuote = quotes.findWhere({ symbol: formData['symbol'] });
    // const foundQuote =  quotes.find(function(model) { return model.get('symbol') === formData['symbol']; });

    // console.log(foundQuote);
    // console.log('here is my found quote');
    this.hamRadio.trigger('find_quote_model', formData);
    const newLimitOrder = new LimitOrder(formData);
    if (newLimitOrder.isValid()) {
      this.model.add(newLimitOrder);
      this.clearFormData();
      console.log(newLimitOrder);
      console.log('that is a new limit order ');
      this.updateStatusMessage(`${newLimitOrder.get('symbol')} Limit Order Created!`);

      this.hamRadio.trigger('add_listener', this.model);
    }
    else {
      console.log('ERROR');
      this.updateStatusMessageFrom(newTask.validationError);
      newTask.destroy();
    }
    return this;
  },
  deleteOrder(quote) {
    debugger
    let quoteName = quote.attributes.symbol;
    let quotePrice = quote.attributes.price;
    this.model.each((order) => {
      if(order.attributes.symbol === quoteName && order.attributes.buy === true && quotePrice <=  order.attributes.targetPrice|| order.attributes.symbol === quoteName && quoteBuy === false && quotePrice >= order.attributes.targetPrice){
      // this.$('#trades').prepend(tradeView.render().$el);
      order.destroy();
      }
    });

    // this.remove();
  },
});

export default LimitOrderListView
