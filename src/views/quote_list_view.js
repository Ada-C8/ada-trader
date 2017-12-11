import Backbone from 'backbone';
import _ from 'underscore';
import QuoteView from './quote_view';
import Quote from '../models/quote';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {

  },
});

export default QuoteListView;
