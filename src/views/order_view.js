import Backbone from 'backbone';
import Order from '../models/order';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;

    // this.listenTo();
  },

  render() {
    console.log('inside order_view render function');
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },

  // events object
  events: {
    'click button.btn-cancel': 'cancelOrder',
  },

  cancelOrder() {
    let symbol = this.model.get('symbol');
    // get rid of order
    this.model.destroy({
      success: function() {
        console.log(`Successfully cancelled market order for  ${symbol}`);
      }
    });
    // remove is probably unneccesary but it tells it to remove itself from the DOM
    this.remove();
  },

});

export default OrderView;
