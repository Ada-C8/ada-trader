import Backbone from 'backbone';
import _ from 'underscore';
import QuoteView from '../views/quote_view';
import Quote from '../models/quote'

const QuoteListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template,
    this.listenTo(this.model, "change", this.render)
  },
  render() {
    // this.$('').empty();
    this.model.each((quote) => {
      const quoteView = new QuoteView ({
        model: quote,
        template: this.template,
        tagName: 'li',
        className: 'quote'
      })
    })

  },


})
