import Backbone from 'backbone';
// import tradeView froml './trade_view';
import Trade from '../models/trade';

const TradeView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render)
    this.bus = params.bus;
    // listenTo event
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  })

  export default TradeView
