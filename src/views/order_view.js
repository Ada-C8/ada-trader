import Backbone from 'backbone';
import Order from 'models/order';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
  },
  render() {
    console.log(this.model.attributes);
    const compiledTemplate = this.template(this.model.attributes);
    console.log('rendered 1');

    this.$el.html(compiledTemplate);

    return this;
  },
});

export default OrderView;
