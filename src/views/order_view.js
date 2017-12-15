import Backbone from 'backbone';
import _ from 'underscore';

import Quote from '../models/quote';
import QuoteList from '../collections/quote_list';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'change', this.render);
    this.bus = params.bus;
    this.listenTo(this.bus, 'orderFinished', this.cancelOrder);
  },
  render() {
    const compileTemplate = this.template(this.model.toJSON());
    this.$el.html(compileTemplate);
    return this;
  },
  events: {
    'click button.btn-cancel': 'cancelOrder'
  },
  cancelOrder: function(e) {
    this.model.destroy();
    this.remove();
  }
});

export default OrderView;
