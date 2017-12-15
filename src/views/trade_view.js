import Backbone from 'backbone';
import Trade from '../models/trade';

const TradeView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
  },
  
  render() {
  },
});

export default TradeView;
