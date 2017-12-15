import Backbone from 'backbone';
import OpenOrderView from '../views/open_order_view'

import OpenOrder from '../models/open_order';

const OpenOrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    // this.listenTo(this.model, 'update', this.render);
    this.bus = params.bus;
    this.listenTo(this.model, 'update', this.render);
    this.listenTo(this.bus, 'quote_symbols', this.symbolDropdown);
    this.listenTo(this.bus, 'quote_change', this.checkOpenOrders);

    // when the quotelist changes, the checkOpenOrders function will check if orders should be purchased or sold
    // this.listenTo(this.bus, 'updated_quote_list', this.checkOpenOrders);

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
      // render returns the taskview which (this) which allows you to append
      this.$('#orders').append(openOrderView.render().$el);
      // this.$('#orders').append(openOrderView.render().$el);

      // at this point want to start listening for things
      // this list view is going to listen to task view for edit me events
      // now any time anyone clicks the edit button on a task view it will call
      // TODO LISTEN FOR CANCEL BUTTON AND FOR TARGET PRICE
      // this.listenTo(taskView, 'edit_me', this.editTask);
    });
    return this;
  },
  // checkOpenOrders(quoteList) {
  checkOpenOrders(quote) {
    console.log('in open orders');
    // console.log(quoteList)
    // var musketeers = friends.where({job: "Musketeer"});

    let openOrders = this.model.where({symbol: quote.get('symbol')});
    console.log(openOrders);
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
          console.log(openOrder);
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
          console.log(openOrder);
          // destroy purchased open order
          openOrder.destroy();
          // make sure quote is recognized as sold so price decreases appropriately
          quote.sell();
        }
      });
    }
  // console.log(openOrders);
  // this.model.each((openOrder) => {
  //   quoteList.each((quote) => {
  //     // if you are buying
  //     if (openOrder.get('buy') && openOrder.get('symbol') === quote.get('symbol')) {
  //       console.log('order target price');
  //       console.log(openOrder.get('targetPrice'));
  //       console.log('quote price');
  //       console.log(quote.get('price'));
  //
  //       if (openOrder.get('targetPrice') >= quote.get('price')) {
  //         let tradeObject = {
  //           price: openOrder.get('targetPrice'),
  //           symbol: openOrder.get('symbol'),
  //           buy: true,
  //         }
  //
  //         this.bus.trigger('add_trade', tradeObject)
  //         console.log(openOrder);
  //         // destroy purchased open order
  //         openOrder.destroy();
  //         // make sure quote is recognized as bought so price increases appropriately
  //         quote.buy();
  //       }
  //     }
  //     else if ((!openOrder.get('buy')) && openOrder.get('symbol') === quote.get('symbol')) {
  //         console.log('order target price');
  //         console.log(openOrder.get('targetPrice'));
  //         console.log('quote price');
  //         console.log(quote.get('price'));
  //
  //         if (openOrder.get('targetPrice') <= quote.get('price')) {
  //           let tradeObject = {
  //             price: openOrder.get('targetPrice'),
  //             symbol: openOrder.get('symbol'),
  //             buy: false,
  //           }
  //
  //           this.bus.trigger('add_trade', tradeObject)
  //           console.log(openOrder);
  //           // destroy purchased open order
  //           openOrder.destroy();
  //           // make sure quote is recognized as sold so price decreases appropriately
  //           quote.sell();
  //
  //     }
  //   }
  //   });
  // });
},
symbolDropdown(quotes) {
  quotes.forEach((quote) => {
    // move to model??
    console.log('in symbol dropdown');
    // console.log(quote.get('symbol'));
    // this.$('select[name=symbol]').append(`<option value="${quote.get('symbol')}">${quote.get('symbol')}</option>`)
    this.$('select[name=symbol]').append(`<option value="${quote}">${quote}</option>`)
    // input[name=${field}]
    // <option value="volvo">Volvo</option>
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
addBuyOpenOrder(event) {
  event.preventDefault();

  let formData = this.getFormData();
  console.log(formData);

  formData['buy'] = true;
  console.log(formData);
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
  console.log(formData);

  formData['buy'] = false;
  console.log(formData);
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

// break out into helper function
getFormData() {
  console.log('in get form data');
  const openOrderData = {};
  ['symbol', 'price-target'].forEach((field) => {
    let val;
    // const val =
    // this.$(`.order-entry-form input[name=${field}]`).val();
    console.log(field);
    if (field === 'symbol') {
      console.log('in if statement if field')
      val =
      this.$(`.order-entry-form select[name=${field}]`).val();
    } else {
      val =
      parseFloat(this.$(`.order-entry-form input[name=${field}]`).val());
      field = 'targetPrice';
    }
    console.log(field);
    // console.log('button buy or sell')
    // console.log(this.$(`.order-entry-form button`).text())
    console.log(val);
    // const val = this.$( `.order-entry-form select[name=${field}] option:selected` ).text();
    if (val !== '') {
      openOrderData[field] = val;
    }
  });
  console.log('openOrderData');

  console.log(openOrderData);
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
