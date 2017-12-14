import Backbone from 'backbone';

const OrderView = Backbone.View.extend({
  initialize(params){
    this.template = params.template;
  },

  render(){
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },

  events: {
    'click button.btn-cancel': 'cancelOrder'
  },

  cancelOrder: function(event){
    console.log('deleted an order');
  },
});

export default OrderView;
