import Backbone from 'backbone';
import Quote from '../models/quote';
import QuoteView from '../views/quote_view';
import QuoteListView from '../views/quote_list_view';

const TradeHistoryView = Backbone.View.extend( {
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.bus, 'selected_trade', this.render);
  },
  // setModel(model) {
  //   this.model = model;
  //   this.render();
  // },
  render(details) {
    // if (this.model) {
    //   console.log(this.model.toJSON());

      const compiledTemplate = this.template(details);
      this.$el.prepend(compiledTemplate);
      return this;
    // }
  },
});
export default TradeHistoryView;
