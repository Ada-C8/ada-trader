import Backbone from 'backbone';

const Trade = Backbone.Model.extend({
  initialize(params) {
    this.buy = params.buy;
    this.symbol = params.symbol;
    this.price = params.price;
  },
});

export default Trade;
