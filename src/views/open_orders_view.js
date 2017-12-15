import Backbone from 'backbone';
import _ from 'underscore';


const OpenOrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    // this.listenTo(this, 'buyOrder', this.render);
    this.bus = params.bus
    // this.model = this.bus.model;
    // console.log(this.bus.model);
    console.log(this.bus);
    this.listenTo(this.bus, 'listOrder', (model) => {
      if (model) {
        this.model = model;
        const newOrder = {
          buy: this.model.attributes.buy,
          symbol: this.model.attributes.symbol,
          targetPrice: parseInt(this.model.attributes.price),
        };
        this.$('#orders').prepend(`<li class="order">${this.template(newOrder)}</li>`);
        // console.log(this.model);

        this.render();
      }
    })
  },
  newOrder() {
    console.log(this);
  },
  render() {
    // console.log(this.model);

    // const trade = {
    //   symbol: quote.model.attributes.symbol,
    //   price: quote.model.attributes.price,
    //   buy:
    // };
    // this.$('#trades').prepend(this.template(trade));
    // console.log('hello');
    // this.$('#quotes').empty();
    // this.model.each((quote) => {
    //   const quoteView = new QuoteView({
    //     model: quote,
    //     bus: this.bus,
    //     template: this.template,
    //     tagName: 'li',
    //     className: 'quote',
    //   });
    //   this.listenTo(quoteView, 'buy', this.model.buy)
    //   this.$('#quotes').append(quoteView.render().$el);
    // });
    return this;
  }
});

export default OpenOrderView;
