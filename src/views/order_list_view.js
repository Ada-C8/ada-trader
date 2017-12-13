import Backbone from 'backbone';
import OrderView from './order_view';
import Order from '../models/order';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.quotes = params.quotes //this might be a bad idea

    this.listenTo(this.model, 'update', this.render);
  },

  render() {
    this.$('#orders').empty();

    this.model.each((order) => {
      const orderView = new OrderView({
        model: order,
        bus: this.bus,
        template: this.template,
        tagName: 'li',
        className: 'order',
      });
      // this.listenTo(taskView, 'edit_event', this.editTask);
      this.$('#orders').append(orderView.render().$el);
    });

    this.newOrderFormRender();

    return this;
  },

  newOrderFormRender() {
    this.quotes.each((quote) => {
      const symbol = quote.get('symbol');
      this.$('#add-order-form select').append(`<option value="${symbol}">${symbol}</option>`);
    });
  },

  events: {
    'click button.btn-buy, button.btn-sell': 'addOrder',
  },

  addOrder(event) {
    event.preventDefault();



    const formData = this.getFormData();
    const quotePrice = this.quotes.where({symbol: formData['symbol']})[0].get('price');

    if (event.target.classList.contains('btn-buy')) {
      formData['buy'] = true;
      if (quotePrice <= formData['targetPrice']) {
        console.log('to set a Buy order, targetPrice must be lower than current price');
        // this.updateStatusMessageFrom(newOrder.validationError);
        return
      }
    } else {
      formData['buy'] = false;
      if (quotePrice >= formData['targetPrice']) {
        console.log('to set a Sell order, targetPrice must be higher than current price');
        // this.updateStatusMessageFrom(newOrder.validationError);
        return
      }
    }



    // if (quote.get('price'))


    const newOrder = new Order(formData);

    if (!newOrder.isValid()) {
      newOrder.destroy();
      // this.updateStatusMessageFrom(newOrder.validationError);
      console.log(newOrder.validationError);
      return;
    }

    this.model.add(newOrder);
    this.clearFormData();
    // this.updateStatusMessage(`${newTask.get('task_name')} Created!`)
  },

  getFormData() {
    const orderData = {};

    orderData['symbol'] = this.$('#add-order-form select[name="symbol"]').val();

    orderData['targetPrice'] = Number(this.$('#add-order-form input[name="price-target"]').val());

    return orderData;
  },
  clearFormData() {
    this.$('#add-order-form input[name="price-target"]').val('');
  },



  // editTask(task) {
  //   // this.model.remove(task);
  //   this.$('#add-task-form input[name=task_name]').val(task.get('task_name'));
  //   this.$('#add-task-form input[name=assignee]').val(task.get('assignee'));
  //   task.destroy();
  // },
  //
  // updateStatusMessageFrom(messageHash) {
  //   const $statusMessages = this.$('#status-messages');
  //   $statusMessages.empty();
  //   Object.keys(messageHash).forEach((messageType) => {
  //     messageHash[messageType].forEach((message) => {
  //       $statusMessages.append(`<li>${message}</li>`);
  //     });
  //   });
  //   $statusMessages.show();
  // },
  //

  // updateStatusMessage(message) {
  //   this.updateStatusMessageFrom({
  //     'task': [message],
  //   });
  // },
  //

});

export default OrderListView;
