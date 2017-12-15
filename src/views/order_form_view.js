import Backbone from 'backbone';

import Quote from '../models/quote';
import QuoteView from './quote_view';

const OrderFormView = Backbone.View.extend({

  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    // this.listenTo(this.model, 'update', this.render);

  },
  render(){
    // this.$('.quotes').empty();

    // this.model.each((quote) => {
    //   const quoteView = new QuoteView({
    //     model: quote,
    //     // template: this.template,
    //     tagName: 'li',
    //     className: 'quote',
    //     bus: this.bus,
    //   });
      // this.$('.quotes').append(orderFormView.render().$el);
      // this.$('.trades').prepend();
    });
    return this;
  },









}); // end

export default OrderFormView;
