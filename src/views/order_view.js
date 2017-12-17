import Backbone from 'backbone';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.model = params.model;
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.bus, 'eraseQuote', this.cancelOrder);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  events: {
    'click button.btn-cancel': 'cancelOrder',
  },
  cancelOrder() {
    this.model.destroy();
    this.remove();
  },
  // checkLimitOrder() {
  //   console.log('hello');
  //   console.log(this.model);
  // },
});

export default OrderView;
