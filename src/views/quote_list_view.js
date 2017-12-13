import Backbone from 'backbone';
import QuoteView from './quote_view';
import Quote from '../models/quote'

const QuoteListView = Backbone.View.extend({
  initialize(params){
    this.template = params.template;
    // this.template = params.template;

  },
  render(){
    console.log('I am in quoteListView render')

    // const renderList = (quoteList) => {
    //
    // const $quoteList = $('#quotes');
    // $quoteList.empty();
    this.$('#quotes').empty()
    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        tagName: 'li',
        className: 'quote',
      });
      console.log(quoteView)
      console.log("appending")
      this.$('#quotes').append(quoteView.render().$el);
    });
    return this
    //this.listenTo(quoteView, 'buy_me', this.buy);
  }
});
export default QuoteListView;
