import Backbone from 'backbone';
import Trade from 'models/trade';

const MarketOrder = Backbone.Collection.extend({
  model: Trade,
});

export default MarketOrder;
