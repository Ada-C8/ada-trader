import Backbone from 'backbone';
import QuoteView from 'views/quote_view';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'update', this.render);
    this.listenTo(this.bus, 'compareToMarketPrice', this.checkSubmittedOrderPrice);
  },

  render() {
    let symbols = [];
    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        tagName: 'li',
        className: 'quote',
        bus: this.bus,
      });
      // symbols.push(quote.get('symbol'));
      // quoteView.render() returns back the jquery object from the quoteView
      // Selects the el tag of the current quotelistview in this case it is the main?
      this.$('#quotes').append(quoteView.render().$el); // TODO: PLEASE BREAK DOWN WHAT $EL IS. THE JQUERY OBJECT? WHY CAN IT GO AT THE END?
    });

    // SEE THE ORDER LIST VIEW FOR THE LISTEN TO RENDER MESSAGE
    this.bus.trigger('append_symbols', this.model);
    return this;
  },

  checkSubmittedOrderPrice(submittedOrder) {
    this.model.forEach((quote) => {

      // TODO:
      if (quote.get('symbol') === submittedOrder.get('symbol') && submittedOrder.get('targetPrice') >= quote.get('price')) {
        return false;
      } else {
        return true;
      }
    });
  },

});

export default QuoteListView;
