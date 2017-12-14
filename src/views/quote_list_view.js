import Backbone from 'backbone';
import QuoteView from './quote_view';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;

    // this.listenTo(this.model, 'update', this.render);
  },

  render() {
    console.log('in quote list render');
    this.$('#quotes').empty(); //ul #quotes

    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        bus: this.bus,
        template: this.template,
        tagName: 'li', // creates an element to put the template in
        className: 'quote', //adds a class to the element
      });
      this.$('#quotes').append(quoteView.render().$el);
    });

    return this;
  },
});

export default QuoteListView;
