import Backbone from 'backbone';
import Order from '../models/order';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus; //listening for prices in quote model

    // this.listenTo(this.bus, 'create_new_order', this.render);
    this.listenTo(this.model, 'change', this.render); //listen for destory
  },

  destroyOrder(event) {
    console.log('In destroyOrder');
    this.model.destroy();
  },

  events: {
    'click button.btn-cancel': 'destroyOrder',
  },

  render(){
    console.log('In order view render:');
    console.log(this.model.targetPrice);
    console.log(this.model.attributes);

    //TODO: when I access attributes via this.model.attributes the targetPrice turns into a string? Workaround below

    const obj = {
      targetPrice: parseFloat(this.model.targetPrice),
      symbol: this.model.symbol,
      buy: this.model.buy,
    }

    const compiledTemplate = this.template(obj);
    this.$el.html(compiledTemplate);

    // const compiledTemplate = this.template(this.model.attributes);
    // this.$el.html(compiledTemplate);

    console.log('Template please?');
    console.log(compiledTemplate);

    return this;
  },

})

export default OrderView;
