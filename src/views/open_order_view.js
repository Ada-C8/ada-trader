import OpenOrder from "../models/open_order";
import Backbone from 'backbone';

const OpenOrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.bus = params.bus
    this.listenTo(this.model, "change", this.render);
  },

  render() {
    this.$el.empty();
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },

  events: {
    'click button.btn-cancel': 'cancel',
  },

  cancel() {
    this.model.destroy();
    this.remove();
    //does this do enough to cancel listeners too?
  },

})

export default OpenOrderView
