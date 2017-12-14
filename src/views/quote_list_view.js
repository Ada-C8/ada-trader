import Backbone from 'backbone';
import QuoteView from './quote_view';
import Quote from '../models/quote'

const QuoteListView = Backbone.View.extend({
  initialize(params){
    this.template = params.template;
    this.bus = params.bus;
    // this.template = params.template;

  },
  render() {
    console.log('I am in quoteListView render');
    // const $quoteList = $('#quotes');
    // $quoteList.empty();
    this.$('#quotes').empty();
    let symbol_array = [];
    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        tagName: 'li',
        className: 'quote',
        bus: this.bus
      });
      let symbol = quote.get('symbol')
      symbol_array.push(symbol)
      // console.log(`this is the symbol ${quote.get('symbol')}`)
      this.$('#quotes').append(quoteView.render().$el);
    });
    console.log(symbol_array)
    this.bus.trigger('dropDown', symbol_array);
    return this
    //this.listenTo(quoteView, 'buy_me', this.buy);
  }
});
export default QuoteListView;
