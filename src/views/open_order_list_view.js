import Backbone from 'backbone';
import OpenOrderView from './open_order_view';
import OpenOrder from '../models/open_order';

const OpenOrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'update', this.render);
    this.listenTo(this.bus, 'quotes', this.updateOptions);
    this.listenTo(this.bus, 'quotes', this.storeQuotes);


  },
  events: {
    'click button.btn-buy, button.btn-sell': 'addOpenOrder',
    //click buy or sell on form add OpenOrder
  },
  render() {
    this.$('#orders').empty();
    this.model.each((openOrder) => {
      const openOrderView = new OpenOrderView({
        model: openOrder,
        template: this.template,
        tagName: 'li',
        className: 'openOrder',
        // quote: '',
        bus: this.bus,
      });
      this.$('#orders').append(openOrderView.render().$el)
    });
    return this;
  },

  compare(model) {
    console.log('comparing');
  },

  //add validations based on
  addOpenOrder(event) {
    event.preventDefault();
    const formData = this.getFormData();

    if(event.currentTarget.innerHTML === 'Buy') {
      formData['buy'] = true
    }

    const newOpenOrder = new OpenOrder(formData);
    if (newOpenOrder.isValid()) {
      //if it is within the right parameters
      this.model.add(newOpenOrder);
      this.clearFormData();
      this.updateStatusMessage('order placed!')
    } else {
      newOpenOrder.destroy();
      this.updateStatusMessageFrom(newOpenOrder.validationError);
    }
  },


  storeQuotes(model) {
    console.log('in store quotes');
    this.quotes = model
  },

//change this so it just passes an array of the symbols
  updateOptions(model) {
    console.log('getting in update options');
    this.$('form>select').html('')
    model.each((quote) => {
      this.$('form>select').append(`<option>${quote.attributes.symbol}</option>`)
    })
  },

  clearFormData() {
    this.$('.order-entry-form input[name=price-target]').val('')
  },

  getFormData() {
    const openOrderData = {};
    openOrderData['symbol'] = this.$('.order-entry-form').find(":selected").text();
    openOrderData['targetPrice'] = parseInt(this.$('.order-entry-form input[name=price-target]').val());
    openOrderData['quote'] = this.quotes.where({symbol:openOrderData['symbol']})[0]
    openOrderData['bus'] = this.bus
    return openOrderData;
  },


  updateStatusMessageFrom(messageHash) {
    const $statusMessages = this.$('.form-errors');
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
      openOrder: [message],
    })
  },

})

export default OpenOrderListView;
