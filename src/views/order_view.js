import Backbone from 'backbone';
import _ from 'underscore';
import Quote from '../models/order';
//copied from tradelist
const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'destroy', this.stop);
    this.bus = params.bus;
  },

  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },

  events: {
    'click .btn-cancel': 'cancelOrder',
  },

  stop() {
     this.model = null;
     this.stopListening();
   },

  cancelOrder() {
    this.model.destroy();
  },
});
export default OrderView;
