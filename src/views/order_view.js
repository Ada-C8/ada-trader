import Backbone from 'backbone';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'placeOrder', this.deleteOrder);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  events: {
    'click button.btn-cancel': 'deleteOrder',
  },
  deleteOrder() {
    this.model.destroy();
    this.remove();
  },
});

export default OrderView;
