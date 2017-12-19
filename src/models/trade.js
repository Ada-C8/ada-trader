// models/trade

import Backbone from 'backbone';

const Trade = Backbone.Model.extend({
  initialize(params) {
    this.symbol = params.symbol;
    this.price = params.price;
    this.buy = params.buy;
  },
});


export default Trade;
