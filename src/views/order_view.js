import Backbone from 'backbone';
import Order from '../models/order';


const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
  
    // if you here the price_change, call the checkPrice method to find out the new price.
    this.listenTo(this.model, 'change', this.render);
  },

  render(){
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },


  events: {
    'click button.btn-cancel': 'cancelOrder',
  },

  cancelOrder(event) {
    this.model.cancelOrder();
  },

  // checkPrice(quote) {
  //   if(false) {
  //     this.cancelOrder();
  //     this.bus.trigger('buy_order', quote); //trigger the buy event
  //   } else if (!this.model.get('buy') && this.model.get('targetPrice') >= quote.get('price')) {
  //     this.bus.trigger('sell_order', quote)
  //     this.cancelOrder();
  //   }
  // },





}); // end order view

export default OrderView
