import Backbone from 'backbone';
import Quote from '../models/quote';
// import QuoteView from '../views/quote_view';
import Order from '../models/order';
import OrderList from '../collections/order_list';
import $ from 'jquery';


const OrderView = Backbone.View.extend({
  initialize(params) { //where do the params come from? app.js
    this.template = params.template;
    this.model = params.model;
    this.listenTo(this.model, 'change', this.render);
    //anytime the model changes, it will redraw it
    this.listenTo(this.model.get('quote'), 'change', this.executeOrder);

  },

  executeOrder() {
    console.log('execute order is being called');
    let quote = this.model.get('quote');

    if (this.model.get('buy')) {
      if (this.model.get('targetPrice') >= quote.get('price')) {
        quote.buy();
        this.model.destroy();
        this.remove();
      }
    } else {
      if (this.model.get('targetPrice') <= quote.get('price')) {
        quote.sell();
        this.model.destroy();
        this.remove();
      }
    }
  },

  render() {
    const compiledTemplate = this.template(this.model.toJSON()); //go that template, send the data from the model as JSON which is like a hash

    this.$el.html(compiledTemplate); //this replaces the html in that element with the complied string from above compiledTemplate

    return this;
  },
  events: {
    'click button.btn-cancel': 'cancel',
  },
  cancel(event) {
    console.log(event);
    this.model.destroy();
  },

});

export default OrderView;
