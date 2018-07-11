import Backbone from 'backbone';
import LimitOrder from 'models/limit_order';

const LimitOrderList = Backbone.Collection.extend({
  model: LimitOrder,
});

export default LimitOrderList;
