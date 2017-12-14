import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.bus, 'order_sale', this.buySellQuote)
  },
  render() {
    // console.log('in quote render');
    const compiledTemplate = this.template(this.model.toJSON());

    this.$el.html(compiledTemplate);

    this.bus.trigger('quote_change_price', this.model)

    return this
  },

  events: {
    'click button.btn-buy': 'buyQuote',
    'click button.btn-sell': 'sellQuote',
    // 'click button.delete': 'deleteTask',
    // 'click button.toggle-complete': 'toggleComplete',
    // 'click button.edit': 'editTask',
    // 'click h3': 'selectTask',
  },

  buyQuote(event) {
    this.buySellQuote({ buy: true, symbol: this.model.get('symbol') });
  },

  sellQuote(event) {
    this.buySellQuote({ buy: false, symbol: this.model.get('symbol') });
  },

  buySellQuote(info) {
    if (info.symbol !== this.model.get('symbol')) {
      return
    }
    let salePrice = info.buy ? this.model.buy() : this.model.sell();

    const attributes = {
      buy: info.buy,
      symbol: this.model.get('symbol'),
      price: salePrice
    }
    this.bus.trigger('buy_sell_quote', attributes)
  }
  // selectTask() {
  //   this.bus.trigger('selected_task', this.model)
  // },
  // editTask(event) {
  //   console.log('clicked Edit');
  //   this.trigger('edit_event', this.model)
  // },
  // deleteTask(event) {
  //   this.model.destroy();
  //   this.remove();
  // },
  // toggleComplete(event) {
  //   this.model.set('is_complete', !this.model.get('is_complete'));
  //   // this.$el.closest('.task').toggleClass('is-complete');
  // },

});


export default QuoteView;
