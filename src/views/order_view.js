import Backbone from 'backbone';
import _ from 'underscore';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.model = params.model;
    this.template = params.template;
    this.bus = params.bus
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
  }
});

export default OrderView;
