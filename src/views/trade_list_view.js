import Backbone from 'backbone';
import _ from 'underscore';
import Quote from '../models/quote';

const TradeListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.bus, 'trade', this.onTrade);
  },
  onTrade(params) {
    this.$('#trades').prepend(this.template(params));
  }
});

export default TradeListView;
