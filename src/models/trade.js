import Backbone from 'backbone';

const Trade = Backbone.Model.extend({
  defaults: {
    symbol: 'UNDEF',
    price: 0.00,
    buy: true,
  },
  // newTrade(model){
  //   console.log(model);
  //   console.log('that is the model^^');
  //   return this;
  // },
});

export default Trade;
