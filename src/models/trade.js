import Backbone from 'backbone';

const Trade = Backbone.Model.extend({
  initialize(params) {
    this.symbol = params.symbol;
    this.buy = params.buy;
    this.price = params.price;
  },
});

export default Trade;
