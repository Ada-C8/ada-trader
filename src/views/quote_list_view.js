import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import QuoteView from '../views/quote_view';
import Quote from '../models/quote';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.quoteTemplate;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        tagName: 'li',
        className: 'quote',
      });
      //Shaunna has a listener in here that appends the template (in a separate method)
      //editMe becomes the name of the custom method we are triggering from the quoteview
      //third parameter- is what is it going to do when it hears it
      this.listenTo(quoteView, 'addBuy', this.prependQuote);
      this.$('#quotes').append(quoteView.render().$el);
    });
    return this;
  },
  //we will append lines of HTML- not an object- from the template
  prependQuote: function(quoteView){
    console.log('we are in the prependQuote method in teh QuoteListView');
    // console.log(this);
    console.log(quoteView.model.attributes);
    const tradeTemplate = _.template($('#trade-template').html());
    $('#trades').prepend(tradeTemplate(quoteView.model.attributes));
  }
});

export default QuoteListView;
