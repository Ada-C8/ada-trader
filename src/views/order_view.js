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

  },
  // will need a destroy order function


});

export default OrderView;
