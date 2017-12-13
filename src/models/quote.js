import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';



const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },
  buy() {
    // Implement this function to increase the price by $1.00

    this.addTemplate(true);
    this.set('price', this.get('price') + 1);
  },

  sell() {
    // Implement this function to decrease the price by $1.00
    this.addTemplate(false);
    this.set('price', this.get('price') - 1);
  },

  addTemplate(buy) {
    const tradeTemplate = _.template($('#trade-template').html());
    const addBuy = _.extend(this.toJSON(), {buy: buy});
    $('#trades').prepend(tradeTemplate(addBuy));
  },
});

export default Quote;
