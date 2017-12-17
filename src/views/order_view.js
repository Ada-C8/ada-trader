import Backbone from 'backbone';
import _ from 'underscore';
import Quote from '../models/order';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model.get('quote'), 'change', this.autoOrder);
  },

  autoOrder() {
    let autoOrdered = (this.model.get('buy')) ? this.model.autoBuy() : this.model.autoSell();

    if (autoOrdered) {
      this.model.destroy();
      this.remove();
    }
  },

  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },

  events: {
    'click .btn-cancel': 'cancelOrder',
  },

  cancelOrder() {
    this.model.destroy();
    this.remove();
  },
});
export default OrderView;
