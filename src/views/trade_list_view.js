import Backbone from 'Backbone';
import _ from 'underscore';
import Quote from '../models/quote';


const TradeListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template
    this.bus = params.bus

    this.listenTo(this.bus, 'makeTrade', this.addTrade);
  },
  render() {
    
  },
    addTrade(trade) {
      console.log('trade connection');
      console.log(trade);
      const compiledTemplate = this.template(trade)
      this.$('#trades').prepend(compiledTemplate)
    }
});

export default TradeListView;
