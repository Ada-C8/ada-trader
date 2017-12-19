import Backbone from 'backbone';
import Quote from '../models/quote';

const Order = Backbone.Model.extend({

  buyIt(){
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
  }
});

export default Order;
