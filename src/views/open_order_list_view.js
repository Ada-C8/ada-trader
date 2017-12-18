import Backbone from 'backbone';
import OpenOrderView from '../views/open_order_view'

import OpenOrder from '../models/open_order';

const OpenOrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'update', this.render);
    this.listenTo(this.bus, 'quote_symbols', this.symbolDropdown);
    this.listenTo(this.bus, 'quote_change', this.checkOpenOrders);

    // list for current quote list
    this.listenTo(this.bus, 'current_quote_list', this.getQuoteList);
  },
  getQuoteList(quoteList) {
    this.quoteList = quoteList;
    console.log('the quote list !!')
    console.log(this.quoteList);

  },
  render() {
    this.$('#orders').empty();

    this.model.each((openOrder) => {
      const openOrderView = new OpenOrderView({
        model: openOrder,
        template: this.template,
        tagName: 'li',
        className: 'order',
        bus: this.bus,
      });
      // render returns the taskview (this) which allows you to append
      this.$('#orders').append(openOrderView.render().$el);
    });
    return this;
  },
  checkOpenOrders(quote) {

    let openOrders = this.model.where({symbol: quote.get('symbol')});
    if (openOrders.length >= 1) {
      openOrders.forEach((openOrder) => {
        // if you are buying
        if (openOrder.get('buy') && openOrder.get('targetPrice') >= quote.get('price'))  {
          let tradeObject = {
            price: openOrder.get('targetPrice'),
            symbol: openOrder.get('symbol'),
            buy: true,
          }
          this.bus.trigger('add_trade', tradeObject)
          // destroy purchased open order
          openOrder.destroy();
          // make sure quote is recognized as bought so price increases appropriately
          quote.buy();
        }
        else if ((!openOrder.get('buy')) && openOrder.get('targetPrice') <= quote.get('price')) {
          let tradeObject = {
            price: openOrder.get('targetPrice'),
            symbol: openOrder.get('symbol'),
            buy: false,
          }
          this.bus.trigger('add_trade', tradeObject)
          // destroy purchased open order
          openOrder.destroy();
          // make sure quote is recognized as sold so price decreases appropriately
          quote.sell();
        }
      });
    }
},
symbolDropdown(quotes) {
  quotes.forEach((quote) => {
    this.$('select[name=symbol]').append(`<option value="${quote}">${quote}</option>`)
  });
},
events: {
  'click button.btn-buy': 'addBuyOpenOrder',
  'click button.btn-sell': 'addSellOpenOrder',
},
updateStatusMessageFrom(messageHash) {
  const $formErrors = this.$('.form-errors');

  $formErrors.empty();
  Object.keys(messageHash).forEach((messageType) => {
    messageHash[messageType].forEach((message) => {
      $formErrors.append(`<li>${message}</li>`);
    });
    $formErrors.show();
  });
},
// TODO: consolidate addBuyOpenOrder and addSellOpenOrder
addBuyOpenOrder(event) {
  event.preventDefault();

  let formData = this.getFormData();

  formData['buy'] = true;
  let correctQuote = this.quoteList.findWhere({symbol: formData['symbol']})
  formData['quote'] = correctQuote;
  const newOpenOrder = new OpenOrder(formData);
  if (newOpenOrder.isValid()) {
    this.model.add(newOpenOrder);
    this.clearFormData();
    console.log('in add buy open order');
  } else {
    console.log('ERROR');
    this.updateStatusMessageFrom(newOpenOrder.validationError);
    newOpenOrder.destroy();
  }
},
addSellOpenOrder(event) {
  event.preventDefault();

  let formData = this.getFormData();

  formData['buy'] = false;

  let correctQuote = this.quoteList.findWhere({symbol: formData['symbol']})
  formData['quote'] = correctQuote;

  const newOpenOrder = new OpenOrder(formData);
  // if is valid add newTask and clearformdata
  if (newOpenOrder.isValid()) {
    this.model.add(newOpenOrder);
    this.clearFormData();
    console.log('in add sell open order');
  } else {
    console.log('ERROR');
    this.updateStatusMessageFrom(newOpenOrder.validationError);
    newOpenOrder.destroy();
  }
},

getFormData() {
  console.log('in get form data');
  const openOrderData = {};
  ['symbol', 'price-target'].forEach((field) => {
    let val;
    if (field === 'symbol') {
      val =
      this.$(`.order-entry-form select[name=${field}]`).val();
    } else {
      val =
      parseFloat(this.$(`.order-entry-form input[name=${field}]`).val());
      field = 'targetPrice';
    }
    if (val !== '') {
      openOrderData[field] = val;
    }
  });

  return openOrderData;
},
clearFormData () {
  ['symbol', 'price-target'].forEach((field) => {
    if (field === 'symbol') {
      this.$(`.order-entry-form select[name=${field}]`).val('');
    } else {
      this.$(`.order-entry-form input[name=${field}]`).val('');
    }
  });
},
});


export default OpenOrderListView;
