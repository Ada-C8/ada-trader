import Backbone from 'backbone';
import Order from '../models/order';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;

    // this.listenTo(this.model, 'change', this.render);
  },

  render() {
    console.log(this.model.toJSON());
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);

    return this;
  },

  events: {
    'click button.btn-cancel': 'removeOrder',
  },

  removeOrder(event) {
    this.model.destroy();
  },

});


export default OrderView;
