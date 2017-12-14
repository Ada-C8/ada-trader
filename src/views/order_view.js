// the individual order on the left
import Backbone from 'backbone';
import Quote from '../models/quote';
import QuoteView from '../views/quote_view';
import QuoteListView from '../views/quote_list_view';
import Order from '../models/order';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'change', this.render);
    this.bus = params.bus;
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON()); //
    this.$el.html(compiledTemplate);
    return this;
  },
  events: {
    'click button.btn-cancel': 'cancel',
  },
  cancel(event) {
    console.log('cancelling');
    this.model.cancel();

    this.bus.trigger('selected_trade', this.model);
  },

});

export default OrderView;
