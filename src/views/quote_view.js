import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'change', this.render);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());

    this.$el.html(compiledTemplate);

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
    let buyPrice = this.model.buy();
    const attributes = {
      buy: true,
      symbol: this.model.get('symbol'),
      price: buyPrice
    }
    this.bus.trigger('buy_sell_quote', attributes)
  },

  sellQuote(event) {
    let sellPrice = this.model.sell();
    const attributes = {
      buy: false,
      symbol: this.model.get('symbol'),
      price: sellPrice
    }
    this.bus.trigger('buy_sell_quote', attributes)
  },
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
