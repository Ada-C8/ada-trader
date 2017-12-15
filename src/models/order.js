import Backbone from 'backbone';

const Order = Backbone.Model.extend({
  buy() {
    // Implement this function to increase the price by $1.00
    this.set('price-target', this.get('price-target'));
  },

  sell() {
    // Implement this function to decrease the price by $1.00
    this.set('price-target', this.get('price-target'));
  },
});

export default Order;
