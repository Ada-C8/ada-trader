import Backbone from 'backbone';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'destroy', this.stopListeningToModel);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  stopListeningToModel() {
    this.model = null;
    this.stopListening();
  }
});

export default OrderView;
