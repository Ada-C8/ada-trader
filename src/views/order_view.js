import Backbone from 'backbone';
import Order from '../models/order';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },

  events: {
    'click .btn-cancel': 'cancel',
  },

  cancel(){
    this.model.destroy();
    this.remove();
  },
});

export default OrderView;
