import Backbone from 'backbone';
import QuoteView from '../views/quote_view';

const QuoteListView = Backbone.View.extend({

  initialize(params){
    this.template = params.template;
    this.tradeTemplate = params.tradeTemplate,
    this.listenTo(this.model, 'update', this.render);
  },

  render(){
    this.$('#quotes').empty();

    this.model.forEach((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        tagName: 'li',
        className: 'quote'
      });

      // Add options for Order Entry Form
      const symbol = quote.get('symbol');
      this.$('select[name=symbol]').append(`<option value="${symbol}">${symbol}</option>`);

      this.listenTo(quoteView, 'addTrade', this.addToTradeHistory);
      this.$('#quotes').append(quoteView.render().$el);
    });
    return this;
  },

  addToTradeHistory: function(quoteView){
    console.log('add to trade history');
    console.log(quoteView);
    const compiledTemplate = this.tradeTemplate(quoteView.model.toJSON());
    this.$('#trades').prepend(compiledTemplate);
  }


});

export default QuoteListView;
