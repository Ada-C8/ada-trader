import Backbone from 'backbone';
import OpenOrderView from './open_order_view';
import OpenOrder from '../models/open_order';

const OpenOrderListView = Backbone.View.extend({
  initialize(params) {
    console.log('in initialize for openorder');
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'update', this.render)
    this.listenTo(this.bus, 'quotes', this.updateOptions)
    console.log(this.bus);

  },
  events: {
    //click buy or sell on form add OpenOrder
  },
  render() {
    //empty divs to re render?

    return this
  },

  addOpenOrder(event) {
    event.preventDefault();

    const formData = this.getFormData();
    const newOpenOrder = new OpenOrder(formData);
    if (newOpenOrder.isValid()) {
      this.model.add(newOpenOrder);
      this.clearFormData();
    } else {
      newOpenOrder.destroy();
    }

    // this.model.add(newTask)
  },

  updateOptions(model) {
    console.log('getting in here');
    model.each((quote) => {
      this.$('form>select').append(`<option>${quote.attributes.symbol}</option>`)
    })
  },

  clearFormData() {
    ['symbol', 'price_target'].forEach((field) => {
      this.$(`.order-entry-form input[name=${field}]`).val('');
    });
  },
  getFormData() {
    const openOrderData = {};
    ['symbol', 'price_target'].forEach((field) => {
      const val = this.$(`.order-entry-form input[name=${field}]`).val();
      if (val !== '') {
        openOrderData[field] = val;
      }
    });
    return openOrderData;
  },


})

export default OpenOrderListView;
