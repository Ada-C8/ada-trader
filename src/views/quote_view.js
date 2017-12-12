import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template,
    this.listenTo(this.model, 'change', this.render) // when a model changes, it will re-render 
  }
});

export default QuoteView;
