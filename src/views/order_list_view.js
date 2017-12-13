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
    'click button.btn-buy': 'addOrder',
  },

  addOrder(event) {
    console.log('in addOrder');
    event.preventDefault();

    const formData = this.getFormData();
    formData['buy'] = true;
    const newOrder = new Order(formData);

    // if (!newTask.isValid()) {
    //   newTask.destroy();
    //   this.updateStatusMessageFrom(newTask.validationError);
    //   return;
    // }

    this.model.add(newOrder);
    // this.clearFormData();
    // this.updateStatusMessage(`${newTask.get('task_name')} Created!`)
  },

  getFormData() {
    const orderData = {};

    orderData['symbol'] = this.$('#add-order-form select[name="symbol"]').val();

    orderData['targetPrice'] = Number(this.$('#add-order-form input[name="price-target"]').val());
    // if (targetPrice !== '') {
    //   orderData['targetPrice'] = targetPrice;
    // } //superfluous? does type='number' return empty string?

    return orderData;
  },
  // clearFormData() {
  //   ['task_name', 'assignee'].forEach((field) => {
  //     const val = this.$(`#add-task-form input[name=${field}]`).val('');
  //   });
  // },
  //
  //
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
