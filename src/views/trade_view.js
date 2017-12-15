import Backbone from 'backbone';
import _ from 'underscore';

const TradeView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.bus, 'newTrade', this.render);
  },
  render() {
    const compiledTradeTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTradeTemplate);
    return this;
  },
});

export default TradeView;
