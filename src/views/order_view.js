import Backbone from 'backbone';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'buy', this.triggerBuy);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  events: {
    'click button.btn-cancel': 'deleteOrder',
  },
  deleteOrder: function() {
    this.model.destroy();
  },
  triggerBuy: function(changeInfo) {
    this.bus.trigger('buyOrder', changeInfo)
  }
})

export default OrderView;
