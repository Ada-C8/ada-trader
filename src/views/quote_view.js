import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
    this.listenTo(this.model, "change", this.render);
    ("I am initializing a view")
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    console.log("I am rendering a view")
    return this;
  },

  // events: {
  //   'click button.delete': 'deleteTask'
  // },
  // deleteTask: function(e) {
  //   this.model.destroy();
  //   this.remove();
  // },
// }};



});

export default QuoteView;
