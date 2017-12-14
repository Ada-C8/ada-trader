import Backbone from 'backbone';
import OrderView from '../views/order_view';

const OrderListView = Backbone.View.extend({

  initialize(params){
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
  },

  render(){
    this.$('#orders').empty();

    this.model.forEach((order) => {
        const orderView = new OrderView({
          model: order,
          template: this.template,
          tagName: 'li',
          className: 'order'
        });

        // add listener for orderform
        this.$('#orders').append(orderView.render().$el);
    });
    return this;
  },

  addToOrders: function(orderView){
    console.log('in addToOrders function at OrderListView');
  }

});
