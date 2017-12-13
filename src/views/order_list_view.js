import Backbone from 'backbone';
import OrderView from './order_view';

const OrderListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    const list = this.$('#orders');
    list.empty();
    this.model.each((order) => {
      const quoteView = new OrderView({
        model: order,
        template: this.template,
        tagName: 'li',
        className: 'order',
        bus: this.bus,
      });
      list.append(quoteView.render().$el);
    });
    return this;
  },
});

export default OrderListView;
