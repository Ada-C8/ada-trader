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
    } // TODO: Do I need to test this if the form has no option for an empty option?

    if (!attributes.price) {
      errors['price'] = "Your starting quote price cannot be blank!";
    }

    if (attributes.price === 0) {
      errors['price'] = "Market price cannot be less than 0!";
    }

    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }
  },

  buy() {
    const currentPrice = this.get('price');
    this.set('price', currentPrice + 1.00);
  },

  sell() {
    const currentPrice = this.get('price');
    this.set('price', currentPrice - 1.00);
  },
});

export default Quote;
