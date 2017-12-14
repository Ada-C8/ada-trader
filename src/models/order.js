import Backbone from 'backbone';
import _ from 'underscore';


const Order = Backbone.Model.extend({
  initialize(params) {
    this.symbol = params.symbol;
    this.price = params.price ;
    this.targetPrice = params.targetPrice;
    this.buy = params.buy
    //listen to something ?
  }

});

export default Order;
