import Backbone from 'backbone';
import Order from '../models/order';

const OpenOrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());

    this.$el.html(compiledTemplate);

    return this;
  },
  events: {
    'click button.btn-cancel': 'cancel',
  },
  cancel(event) {
    // console.log('cancel');
    if (confirm("Are you sure?") === true){
      this.model.destroy();
    }
  }
});

export default OpenOrderView;
