import Backbone from 'backbone';
import _ from 'underscore';

const Order = Backbone.Model.extend({
  autoBuy() {
    let quote = this.get('quote');

    if (this.get('targetPrice') >= quote.get('price') ||
        this.get('targetPrice') === '') {

      quote.buy();
      return true;
    }
    return false;
  },

  autoSell() {
    let quote = this.get('quote');

    if (this.get('targetPrice') <= quote.get('price') ||
        this.get('targetPrice') === '') {

      quote.sell();
      return true;
    }
    return false;
  }

});

export default Order;
