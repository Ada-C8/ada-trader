import Backbone from 'backbone';
import OpenOrder from '../models/open_order';

const OpenOrderList = Backbone.Collection.extend({
  model: OpenOrder,


});


export default OpenOrderList;
