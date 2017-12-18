import Backbone from 'backbone';
import Quote from '../models/quote';
import Order from '../models/order';
import OrderList from '../collections/order_list';
import $ from 'jquery';

const OpenOrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    // this.quotes = params.quotes;
    this.model = params.model;
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model.get('quote'), 'change', this.completeOrder);

  },
  completeOrder() {
    console.log('the complete order method is being called');
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
    const compiledTemplate = this.template(this.model.toJSON());

    this.$el.html(compiledTemplate);

    return this;
  },
  events: {
    'click button.btn-cancel': 'cancel',
  },
  cancel(event) {
    if (confirm("Are you sure?") === true){
      this.model.destroy();
    }
  },
});

export default OpenOrderView;
