import Backbone from 'backbone';

const QuoteView = Backbone.View.extend ({
initialize(params) {
  this.template = params.template;
},
});

export default QuoteView;
