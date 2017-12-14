import Backbone from 'backbone';
import _ from 'underscore';
import Quote from '../models/quote';

const OrderEntryView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model.quotes, 'update', this.render);
  },
  render() {
    this.$('select[name="symbol"]').empty();
    this.model.quotes.each((quote) => {
      console.log(this.template(quote));
      this.$('select[name="symbol"]').append(this.template(quote));
    })
  },
  // function!
});

export default OrderEntryView;
