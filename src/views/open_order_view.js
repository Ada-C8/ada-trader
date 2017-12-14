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
    // 'click button.toggle-complete': 'toggleComplete',
    // 'click button.edit': 'editTask',
    // 'click': 'selectTask'
  },

  deleteOpenOrder(event) {
    // deletes model, removes from collection, and stops it from listening
    // better to tell model to remove itself
    // this.remove will tell the view to remove itself from the DOM
    // may be unecessary because will re-render
    this.model.destroy();
    this.remove();
  },

});

export default OpenOrderView;
