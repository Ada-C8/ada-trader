import Backbone from 'backbone';
import Quote from '../models/quote';

const Order = Backbone.Model.extend({
  defaults: {
   symbol: 'UNDEF',
   targetPrice: 0.00,
   buy: true,
   // quote: null
 },
// Validation is not working
//  validate(attributes) {
//     const errors = {};
//     const targetPrice = this.get('targetPrice');
//     const symbol = this.get('symbol');
//
//     if (!attributes.targetPrice) {
//       errors['targetPrice'] = ["Target Price is required"];
//     }
//
//     if (!attributes.symbol) {
//       errors['symbol'] = ["Symbol is required"];
//     }
//
// },
//

  buyit(){
    const quote = this.get('quote');

    if (this.get('targetPrice') >= quote.get('price') ||
        this.get('targetPrice') === ''){
          quote.buy();
          return true;
        }
        return false;
  },

  sellIt(){
    const quote = this.get('quote');

    if (this.get('targetPrice') <= quote.get('price') ||
        this.get('targetPrice') === '') {

      quote.sell();
      return true;
    }
    return false;
  },



});

export default Order;
