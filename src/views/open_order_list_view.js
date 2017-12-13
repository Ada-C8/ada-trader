import Backbone from 'backbone';
import OpenOrderView from '../views/open_order_view'

import OpenOrder from '../models/open_order';

const OpenOrderListView = Backbone.View.extend({
  initialize(params) {
    // this.template = params.template;
    // this.listenTo(this.model, 'update', this.render);
    // this.bus = params.bus;
  },
  render() {
    this.$('#quotes').empty();
        console.log('in quotelistview render');
    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        tagName: 'li',
        // TODO: check for styling
        className: 'quote',
        bus: this.bus,
      });
      console.log('in quotelistview render');
      this.$('#quotes').append(quoteView.render().$el);

    });
    return this;
  }
});


export default OpenOrderListView;
