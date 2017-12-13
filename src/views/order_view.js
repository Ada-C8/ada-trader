import Backbone from 'backbone';
import Order from '../models/order';
import _ from 'underscore';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'change', this.render);
  },
  render() {
    console.log('entering rendering!');
    console.log(this);
    console.log(this.model);
    console.log(this.model.targetPrice);
    console.log(this.model.toJSON());
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  }

})

export default OrderView;
