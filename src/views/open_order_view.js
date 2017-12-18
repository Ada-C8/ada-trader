import Backbone from 'backbone';
import OpenOrder from '../models/open_order';

const OpenOrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus;
    this.listenTo(this.model, 'change', this.render);
  },

  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  events: {
    'click button.btn-cancel': 'deleteOpenOrder',
  },

  deleteOpenOrder(event) {
    this.model.destroy();
    this.remove();
  },

});

export default OpenOrderView;
