import Backbone from 'backbone';
import _ from 'underscore';


const Trade = Backbone.Model.extend({

  initialize(params){
    this.symbol = params.symbol;
    this.buy = params.buy;
    this.price = params.price;
  },

  validate(params) {

    const errors = {};
    if (!params.symbol) {
      errors['symbol'] = ["Symbol required."]
    }

    if (!params.price) {
      errors['price'] = ["Price required."]
    }
    if (Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }
  }
});

export default Trade;
