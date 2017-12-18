import Backbone from 'backbone';
import _ from 'underscore';
import Quote from '../models/quote';
import QuoteView from '../views/quote_view';

const QuoteListView = Backbone.View.extend ({
initialize(params) {
  this.quoteTemplate = params.quoteTemplate;
  this.listenTo(this.model, 'update', this.render);
  this.bus = params.bus;
},
render() {
  this.$('#quotes').empty();
  //use the template
  this.model.each((quote) => {
    const quoteView = new QuoteView({
      model: quote,
      template: this.quoteTemplate,
      tagName: 'li',
      className: 'quote',
    });
    this.$('#quotes').append(quoteView.render().$el);
  });


  //append template to html
  return this;
},
});

export default QuoteListView;
