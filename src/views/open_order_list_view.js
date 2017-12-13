import Backbone from 'backbone';
import OpenOrderView from './open_order_view';
import OpenOrder from '../models/open_order';

const OpenOrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'update', this.render);
    this.listenTo(this.bus, 'quotes', this.updateOptions);

  },
  events: {
    'click button.btn-buy': 'buyOpenOrder',
    'click button.btn-sell': 'sellOpenOrder',
    //click buy or sell on form add OpenOrder
  },
  render() {

    this.model.each((openOrder) => {
      const openOrderView = new OpenOrderView({
        model: openOrder,
        template: this.template,
        tagName: 'li',
        className: 'openOrder',
        bus: this.bus,
      });
      this.$('#orders').append(openOrderView.render().$el)
    });
    //empty divs to re render?

    return this;
  },

  buyOpenOrder(event) {
    event.preventDefault();

    const formData = this.getFormData();
    formData['buy'] = true
    const newOpenOrder = new OpenOrder(formData);
    if (newOpenOrder.isValid()) {
      this.model.add(newOpenOrder);
      this.clearFormData();
    } else {
      newOpenOrder.destroy();

    }
  },

  sellOpenOrder(event) {
    event.preventDefault();
    const formData = this.getFormData();
    const newOpenOrder = new OpenOrder(formData);
    if (newOpenOrder.isValid()) {
      this.model.add(newOpenOrder);
      this.clearFormData();
    } else {
      this.updateStatusMessageFrom(newTask.validationError);
      newOpenOrder.destroy();
    }
  },

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
