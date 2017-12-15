import Backbone from 'backbone';
import _ from 'underscore';

const TradeListView = Backbone.View.extend({
  initialize(params){
    this.template = params.template;
    this.bus = params.bus
    this.listenTo(this.bus, 'addTrade', this.addTrade);
  },

  addTrade(trade_data) {
    console.log('I am getting ready to add a trade');
    const compiledTemplate = this.template(trade_data)
    this.$('#trades').prepend(compiledTemplate)
  },
});

export default TradeListView;
