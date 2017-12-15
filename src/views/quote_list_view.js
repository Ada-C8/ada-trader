import Backbone from 'backbone';
import QuoteView from 'views/quote_view';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'update', this.render);
    this.listenTo(this.bus, 'compareToMarketPrice', this.checkSubmittedOrderPrice);
  },

  render(event) {
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

  checkSubmittedOrderPrice(formData) {
    this.model.forEach((quote) => {
      if (quote.get('symbol') === formData['symbol']) {
        if ((parseInt(formData['targetPrice']) >= parseInt(quote.get('price'))) || ((parseInt(formData['targetPrice'])) < 0)) {
          const $errorDisplay = this.$('.form-errors');
          $errorDisplay.append(`<p>Your must be less than the current market price and greater than 0!</p>`);
        } else {
          this.bus.trigger('createBuyOrder', formData);
        }
      } // TODO: Write else statement or error if no symbols match
    });
  },



    // this.model.forEach((quote) => {
    //   // TODO: Add conditional if the price is less than 0
    //   if (quote.get('symbol') === submittedOrder.get('symbol')) {
    //     if ((parseInt(submittedOrder.get('targetPrice')) >= parseInt(quote.get('price'))) || (parseInt(submittedOrder.get('price')) < 0)) {
    //       const $errorDisplay = this.$('.form-errors');
    //       $errorDisplay.append(`<p>Your must be less than the current market price and greater than 0!</p>`);
    //     } else {
    //       this.bus.trigger('')
    //     }
    //   }
    // });
});

export default QuoteListView;
