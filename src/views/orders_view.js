import Backbone from 'backbone';

const OrdersView = Backbone.View.extend({
  initialize(params){
    this.bus = params.bus;

    // this.listenTo(this.model, 'update', this.render);
  }
});

export default OrdersView;
