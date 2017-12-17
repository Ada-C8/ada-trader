import Backbone from 'backbone';

const Quote = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00
  },

  validate(attributes) {
    const errors = {}

    if (!attributes.symbol) {
      errors['symbol'] = "Symbol cannot be blank!";
    }
    if (attributes.price === '') { // '' false !attributes --> true
      errors['price'] = "Your starting quote price cannot be blank!";
    } else if (attributes.price <= 0) { // true '' == 0
      errors['price'] = "Market price must be greater than 0!";
    }

    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }
  },

  buy() {
    this.set('price', this.get('price') + 1.00);
  },

  sell() {
    this.set('price', this.get('price') - 1.00);
  },
});

export default Quote;
