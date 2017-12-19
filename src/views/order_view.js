import Backbone from 'backbone';
import Order from '../models/order';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;

    this.listenTo(this.model.get('quote'), "change", this.processOrder);
  },
  processOrder(){
    if(this.model.get('buy')){
      if(this.model.buyIt()){
        this.model.destroy();
        this.remove();
      }
    }
    else{
      if(this.model.sellIt()){
        if(this.model.sellIt()){
          this.model.destroy();
          this.remove();
        }
      }
    }
  },

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
