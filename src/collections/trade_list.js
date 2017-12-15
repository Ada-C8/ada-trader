import Backbone from 'backbone';
import Trade from 'models/trade';

const TradeList = Backbone.Collection.extend({
  model: Trade,
});

export default TradeList;
