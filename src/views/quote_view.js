import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, "change", this.render);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);

    return this;
  }, //end of render
  events: {
    'click button.alert': 'buyStock',
    'click button.success': 'sellStock',
  },
  buyStock: function(e) {
    this.model.buy();
  },
  sellStock: function(e) {
    console.log("button is clicked");
    this.model.sell();
  }
}); // end of QuoteView

export default QuoteView;
