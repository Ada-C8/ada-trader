import Backbone from 'backbone';

import QuoteView from './quote_view';
import Quote from '../models/quote';
import TradeHistoryView from './trade_history_view';

const QuoteListView = Backbone.View.extend({
// this initialize takes what we defined in app.js
// so it sets the template and bus for this view to the ones define in app.js
// in this case the quote template and the bus we created.
// it will listen to this model, which is the one we set up -- new quoteList with seed data
initialize(params) {
  this.template = params.template;
  this.bus = params.bus;
  this.listenTo(this.model, 'update', this.render);

},
render(){
  // console.log("IN the quote list view render function");
  this.$('.quotes').empty();
// for this model (quoteList), take each quote and create a quote view instance by sending in these params. Our model here is quote. assign each view instance an li tag and class of quote
  this.model.each((quote) => {
    const quoteView = new QuoteView({
      model: quote,
      template: this.template,
      tagName: 'li',
      className: 'quote',
      bus: this.bus,
    }); // end quoteView const

    console.log("appending");
    this.$('.quotes').append(quoteView.render().$el);

    let x = document.getElementById("symbol");
    let option = document.createElement("option");
    // option.name = "symbol-name";
    // option.value = quote.get('symbol');
    option.text = quote.get('symbol');
    x.add(option);

    // call render on the quote view instance
    // then grab the root dom element for quote view, which is quotes-container
    // then append the div with class quote that we got back from the quote list render function to the ul with class quotes .

    // to be the quotes-container (currently a div that contains a heading and the ul for #quotes) to be that of the template. //then back to quoteListview where it will be rattached to the quotes
    // console.log("appended the rendered view")
    // <div id="quotes-container" class="quotes-container columns small-10 small-offset-1 end">
    //   <h2>Quotes</h2>
    //   <div class="quotes-list-container">
    //     <ul id="quotes" class="quotes">
    //       <!--  Where quotes will be displayed as lis -->
    //     </ul>
    //   </div>
    // </div>
    // console.log(quote.get('symbol'));

    // this.$('#symbol').append('<option>' + quote.get('symbol') + '</option>');





  }); // end each
  return this;
},

}); //end quotelistview



export default QuoteListView;





// const tradeHistoryView = new TradeHistoryView({
//   bus: this.bus,
//   template: tradeTemplate,
//   el: '.trades'
// });
//
// tradeHistoryView.render();
