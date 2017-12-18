import Backbone from 'backbone';
import Quote from '../models/quote';
import QuoteList from '../collections/quote_list';
import _ from 'underscore';

const TraderView = Backbone.View.extend({
  initialize(params){
    this.template = params.template;
    this.bus = params.bus;
  },
  render(){
    const compiledTemplate = this.template(this.model);
    this.$el.html(compiledTemplate);
    return this
  }
});

export default TraderView;
