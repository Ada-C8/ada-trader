import Backbone from 'backbone';
import OpenOrder from '../models/open_order';

const OpenOrderView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
    this.bus = params.bus;
  },

  render(){
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this
  },

  events: {
    'click button.btn-cancel': 'deleteOrderView',
  },

  deleteOrderView(){
    this.model.destroy();
  },
});

export default OpenOrderView;
