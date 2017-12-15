import Backbone from 'backbone';
import Order from '../models/order';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    // this.listenTo(this.model, 'change', this.render);
  },

  events: {
    'click button.btn-cancel': 'cancelOrder',
  },

  render() {
    // console.log('hits the render function');
    // console.log('This is my render function in order view')
    const compiledTemplate = this.template(this.model.toJSON());
    // console.log(compiledTemplate);
    this.$el.html(compiledTemplate);
    return this;
  },

  cancelOrder(event) {
    // TRIGGERS ORDER LIST VIEW TO RE RENDER
    // console.log('why does this button not work')
    this.remove({silent: true});
    this.model.destroy({silent: true});
    // console.log('Model is destroyed');
  },
});

export default OrderView;
