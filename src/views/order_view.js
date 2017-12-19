import Backbone from 'backbone';

import Order from '../models/order';
import Quote from '../models/quote';

import OrderList from '../collections/order_list';

import $ from 'jquery';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.model = params.model;
    this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model.get('quote'), 'change', this.closeOrder);
  },

  closeOrder() {
    if(this.model.get('buy')){
      if(this.model.buyStock()){
        this.model.destroy();
        this.remove();
      }
    }
    else{
      if(this.model.sellStock()){
        if(this.model.sellStock()){
          this.model.destroy();
          this.remove();
        }
      }
    }
  },
    // let quote = this.model.get('quote');
//moved logic to model
    // if (this.model.get('buy')) {
    //   if (this.model.get('targetPrice') >= quote.get('price')) {
    //     quote.buy();
    //     this.model.destroy();
    //     this.remove();
    //   }
    // } else {
    //   if (this.model.get('targetPrice') <= quote.get('price')) {
    //     quote.sell();
    //     this.model.destroy();
    //     this.remove();
    //   }
    // }
  // },

  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },

  events: {
    'click .btn-cancel': 'cancel',
  },

  cancel(){
    this.model.destroy();
    this.remove();
  },
});

export default OrderView;
