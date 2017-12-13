import Backbone from 'backbone';
import Order from '../models/order';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus; //listening for prices in quote model

    this.listenTo(this.bus, 'create_new_order', this.render);
    this.listenTo(this.model, 'change', this.render); //listen for destory
  },

  events: {

  },

  render(data){
    console.log('In order view render:');
    const compiledTemplate = this.template(data);
    this.$el.prepend(compiledTemplate);

    return this;
  },

})

export default OrderView;
