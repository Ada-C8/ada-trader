import Backbone from 'backbone';
import TraderView from '../views/trader_view';

import _ from 'underscore';

const TraderListView = Backbone.View.extend({
  initialize(params){
    this.bus = params.bus;
    this.template = params.template;
    // Liste the but, sell event
    this.listenTo(params.bus, 'buyQuote', this.addTraderBuy);
    this.listenTo(params.bus, 'sellQuote', this.addTraderSell);
    // this.listenTo(this.model, 'buy', this.addTraderBuy);
    // this.listenTo(this.model, 'sell', this.addTraderSell);
    // TODO to change click, I want to add the element to the list after they click buy or sellQuote
  },
  addTraderBuy(quote){
    const trade = {
      symbol:quote.get('symbol'),
      price: quote.get('price'),
      buy: true

    }
    const traderView = new TraderView({
      model: trade,
      template: this.template,
      bus: this.bus,
    });

    this.$('.trades').prepend(traderView.render().$el);
    console.log("inside the addTraderBuy");
  },

  addTraderSell(quote){


    const tradesell = {
      symbol:quote.get('symbol'),
      price: quote.get('price'),
      buy: false

    };

    const traderView = new TraderView({
      model: tradesell,
      template: this.template,
      bus: this.bus,
    });

    this.$('.trades').prepend(traderView.render().$el);
    console.log("inside the addSell");

}










  //   const traderView = new TraderView({
  //     model: trade,
  //     template: this.template,
  //   });
  //
  //   this.$('.trades').prepend(traderView.render().$el);
  // },
});

export default TraderListView;
