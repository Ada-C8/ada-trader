import Backbone from 'backbone';
import _ from 'underscore';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'change', this.render);
    // TODO: add trigger for newOrder
    this.listenTo(this.bus, 'newOrder', this.render);
  },
  render() {
    const compiledTradeTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTradeTemplate);
    return this;
  }
});

export default OrderView
