import Backbone from 'backbone';
import LimitOrder from '../models/limit_order';


const LimitOrderView = Backbone.View.extend({
  initialize(params){
    // debugger
    console.log(params);
    this.template = params.template;
    this.hamRadio = params.hamRadio;
    this.listenTo(this.model, 'change', this.render);
  },

  render(){

    const compiledTemplate =  this.template(this.model.toJSON());

    this.$el.html(compiledTemplate);
    return this;
  },
  events:{
      'click button.btn-cancel': 'cancelLimitOrder',
    // 'click form button.btn-buy': 'order_purchase',
    // 'click form button.btn-sell': 'order_sell',
  },
  cancelLimitOrder(){
    console.log('banana');
    this.model.destroy();
  },


});

export default LimitOrderView;
