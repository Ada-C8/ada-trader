import Backbone from 'backbone';
import QuoteView from 'views/quote_view';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'update', this.render);
  },

  render() {
    // this.$('#quotes').empty();
    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        tagName: 'li',
        className: 'quote',
        bus: this.bus,
      });
      // console.log('This is the quote_list_view model: this.model' + this.model);
      this.bus.trigger('create_orders', this.model);

      // quoteView.render() returns back the jquery object from the quoteView
      // Selects the el tag of the current quotelistview in this case it is the main?
      this.$('#quotes').append(quoteView.render().$el); // TODO: PLEASE BREAK DOWN WHAT $EL IS. THE JQUERY OBJECT? WHY CAN IT GO AT THE END?
    });
    return this;
  },
});

export default QuoteListView;
