import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
// import Order from 'models/order'

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.orderTemplate = _.template($('#order-template').html());
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  // events: {
  //   'click button.btn-buy': 'buyOrder'
  //   // 'click button.btn-sell': 'sellOrder',
  // },
  // buyOrder: function(event) {
  //   event.preventDefault();
  //   console.log('click');
  //   // event.preventDefault();
  //   // const orderData = {};
  //   // ['price-target','name'].forEach((field) => {
  //   //   const val = this.$(`[name=${field}]`).val();
  //   //   console.log(val);
  //   //   if (val != '') {
  //   //     taskData[field] = val;
  //   //   }
  //   // });
  //   // const newOrder = new Order(orderData);
  //   // $('#orders').prepend(this.orderTemplate(newOrder));
  // },
  // sellOrder(e) {
  //   e.preventDefault();
  //   const addSell = {};
  //   $('#orders').prepend(this.orderTemplate(addSell));
  // },
});

export default OrderView;
