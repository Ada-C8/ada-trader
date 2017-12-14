import Backbone from 'backbone';

const Order = Backbone.Model.extend({

  //need to do validations first, then call if !valid, in orderlistview... and then check against the price expectations...
    // validations
  validate(attributes) {
    let errors;
    if (!attributes.targetPrice) {
      errors = 'Must enter a target price';
    }
    // const quotePrice = this.get('quote').get('price');
    // const noBuy = this.get('buy') && (quotePrice <= this.get('targetPrice'))
    // const noSell = !this.get('buy') && (quotePrice >= this.get('targetPrice'))
    //
    // if (noBuy || noSell) {
    //   errors = `to set a ${noBuy ? 'buy' : 'sell'} order, targetPrice must be ${noBuy ? 'lower' : 'higher'} than current price`;
    // }
    //
    if ( errors ) {
      return errors;
    } else {
      return false;
    }
  },
  // buy() {
  //   console.log('in order model buying');
  //   // let price = this.get('price');
  //   // this.set({price: (price-1)});
  //   // this.set({buy: true});
  //   // return price;
  // },
  // sell() {
  //   console.log('in order model selling');
  //   // let price = this.get('price');
  //   // this.set({price: (price+1)});
  //   // this.set({buy: false});
  //   // return price;
  // },


});

export default Order;
