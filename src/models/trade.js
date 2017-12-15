// models/trade

import Backbone from 'backbone';

const Trade = Backbone.Model.extend({
  initialize(params) {
    this.symbol = params.symbol;
    this.price = params.price;
    this.buy = params.buy;
    this.template = params.template;
  },
  render() {
    const compiledTemplate = this.template(this.model.attributes);
  },
});


export default Trade;
