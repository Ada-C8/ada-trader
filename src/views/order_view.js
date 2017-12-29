import Backbone from 'backbone';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'destroy', this.stopListeningToModel);
  },
  events: {
    'click .btn-cancel': 'cancelOrder',
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  stopListeningToModel() {
    this.model = null;
    this.stopListening();
  },
  cancelOrder() {
    this.model.destroy();
  }
});

export default OrderView;
