import Backbone from 'backbone';
import TraderView from '../views/trader_view';

const TraderListView = Backbone.View.extend({
  initialize(params){
    this.template = params.template;
    // Liste the but, sell event
    this.listenTo(this.model, 'buy', this.addTraderBuy);
    this.listenTo(this.model, 'sell', this.addTraderSell);
    // TODO to change click, I want to add the element to the list after they click buy or sellQuote
  },
  addTraderBuy(trade){
    const traderView = new TraderView({
      model: trade,
      template: this.template,
    });

    this.$('.trades').prepend(traderView.render().$el);
    console.log("inside the addTraderBuy");
  },

  addTraderSell(trade){
    const traderView = new TraderView({
      model: trade,
      template: this.template,
    });

    this.$('.trades').prepend(traderView.render().$el);
  },
});

export default TraderListView;
