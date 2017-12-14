import Backbone from 'backbone';
import OrderView from '../views/order_view';

const OrderListView = Backbone.View.extend({

  initialize(params){
    this.template = params.template;
    // this.listenTo(this.model, 'update', this.render);
  },

  events: {
    'click button.btn-buy': 'buyOrder',
    'click button.btn-sell': 'sellOrder',
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

        this.$('#orders').append(orderView.render().$el);
    });
    return this;
  },

  buyOrder: function(event){
    this.addToOrders(event);
  },

  sellOrder: function(event){
    this.addToOrders(event);
  },

  addToOrders: function(event){
    event.preventDefault();
    console.log('in addToOrders function at OrderListView');
  }

});

export default OrderListView;
