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
    console.log('toothbrush');
    console.log(this.hamRadio);
    console.log(`this is hamRadio `);
    // this.listenTo(this.hamRadio, 'order_purchase', '###some method goes here');
    // this.listenTo(this.hamRadio, 'order_sold', '###some method goes here');
    this.listenTo(this.model, 'update', this.render);
  },
  events:{
    // 'click #add-new-task': 'addTask',
  },
  updateStatusMessageFrom(messageHash){

  },
  updateStatusMessage(message){

  },
  // orderPurchase(model){
  //   const newTrade = new Trade({symbol: model.attributes.symbol, price: model.attributes.price, buy: false});
  //
  //   if(newTrade.isValid()){
  //     this.model.add(newTrade);
  //     this.updateStatusMessage(`${newTrade.get('symbol')} Created!`);
  //   }else{
  //     console.log('Something went wrong!');
  //     this.updateStatusMessageFrom(newTrade.validationError);
  //   }
  //   return newTrade;
  // },
  // orderSold(model){
  //
  //   const limitOrder = new LimitOrder({symbol: model.attributes.symbol, price: model.attributes.price});
  //   console.log(limitOrder);
  //
  //   if(limitOrder.isValid()){
  //     this.model.add(limitOrder);
  //     this.updateStatusMessage(`${limitOrder.get('symbol')} Created!`);
  //   }else{
  //     console.log('Something went wrong!');
  //     this.updateStatusMessageFrom(limitOrder.validationError);
  //   }
  //   return limitOrder;
  // },
  render() {

    this.$('#orders').empty();
    console.log('This is the limit order view model:' + this.model);
    // debugger
    this.model.each((order) => {
      console.log(order);
      console.log(this.template);
      const limitOrderView = new LimitOrderView({
        model: limitOrder,
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

});

export default LimitOrderListView
