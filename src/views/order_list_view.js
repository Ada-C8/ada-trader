import Backbone from 'backbone';
// import QuoteView from '../views/quote_view';
// import Quote from '../models/quote';

const OrderListView = Backbone.View.extend ({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
  },

  render() {
    // create new open orders
    this.model.each((order) => {
      const orderView = new OrderView({
        model: order,
        template: this.template,
        tagName: 'li',
        className: 'orders',
      });

      this.$('#orders').append(orderView.render().$el);
    });
    return this;
  },
  //
  // addTrade(quote) {
  //   console.log('passing new trade to trades view');
  //   this.trigger('add_trade', quote);
  // }


  // buy action


});

export default OrderListView;
