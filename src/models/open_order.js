import Backbone from 'backbone';

const OpenOrder = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00,
    buy: false
  },

  initialize(attributes) {
  },

  validate(attributes) {
    const errors = {}
    if (attributes.price < 0){
      errors['price'] = ['price must be greater than 0']
    }

    if (attributes.price === ''){
      errors['price'] = ['please enter a price']
    }

    console.log(errors)
  }

  //functionality open quotes need:
  //1. must create a quote with information from
  // '.order-entry-form'
  //2. must evaluate whether or not a price meets acceptability standards (can't be higher than current price for sell or lower than current price for buy--else not in best interest of trader)
  //3. must have a listener for when the price is a specified amount; must trigger a buy/sell event;
  //4. which means that buy/sell must have an event handler for listening to this model.
});

export default OpenOrder;
