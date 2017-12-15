import Backbone from 'backbone';
import Order from '../models/order';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'destroy', this.render);
  },

  events: {
    'click button.btn-cancel': 'cancelOrder',
  },

  render() {
    // fires on the add but not
    //console.log('3. renders upon initialization')

    // console.log('hits the render function');
    // console.log('This is my render function in order view')
    const compiledTemplate = this.template(this.model.toJSON());
    // console.log(compiledTemplate);
    this.$el.html(compiledTemplate);

    // SEE QUOTE LIST VIEW FOR LISTEN TO EVENT
    return this;
  },

  cancelOrder(event) {
    // TRIGGERS ORDER LIST VIEW TO RE RENDER
    this.remove();
    this.model.destroy(); // This triggers update in the order list view and not this model!
  },
});

export default OrderView;
