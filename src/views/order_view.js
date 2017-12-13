import Backbone from 'backbone';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'change', this.render);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  events: {
    'click button.btn-cancel': 'deleteOrder',
  },
  deleteOrder: function() {
    this.model.destroy();
  },
  executeOrder: function(changeInfo) {
    if (this.model.get('symbol') === changeInfo.symbol && this.model.get('buy') === true && changeInfo.currentPrice <= this.model.get('targetPrice')) {
      console.log('I should buy');
    }


  }
})

export default OrderView;
