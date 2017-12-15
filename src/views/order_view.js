import Backbone from 'backbone';
import Order from '../models/order';
import _ from 'underscore';
import $ from 'jquery'

const OrderView = Backbone.View.extend({
  initialize(params)  {
    this.template = params.template;
    this.bus = this.bus;
    this.listenTo(this.model, 'change', this.render)
  },

  render() {
    // const compiledOrderTemplate = this.template(this.model.toJSON())
    // this.$el.html(compiledOrderTemplate);
    const orderTemplate = this.template(this.model.toJSON())

    // this.$el.html(orderTemplate(this.model.toJSON()));
    this.$el.html(orderTemplate);
    return this

    //SOMETHING IS WRONG WITH THE TEMPLATE
  },

  events: {
    'click button.btn-cancel': 'cancelOrder'
  },


  cancelOrder(e) {
    e.preventDefault();
    this.remove()
    this.model.destroy();
  },

  
});

export default OrderView;

//right now I have OrderView able to initialize a single view of an order and render it;
