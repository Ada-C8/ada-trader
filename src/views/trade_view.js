import Backbone from 'backbone';
import Trade from '../models/trade';

const TradeView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
  }
});

// TODO: Where do the new instances of the TradeView get instantiated?
// TODO: They need to instantiated in the render of the 
export default TradeView;
