import Backbone from 'backbone';

import QuoteView from './quote_view';
import Quote from '../models/task';
import CurrentQuoteView from './current_selected_view';

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;

    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    this.$('#quotes').empty();
  }
  events: {
    'click #add-'
  }
})
