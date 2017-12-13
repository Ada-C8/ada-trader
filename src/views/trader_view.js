import Backbone from 'backbone';
import Quote from '../models/quote';
import QuoteList from '../collections/quote_list';

const TraderView = Backbone.View.extend({
  initialize(params){
    this.template = params.template;
    // TODO to change click, I want to add the element to the list after they click buy or sellQuote
  },
  render(){
    // TODO
    const compiledTemplate = this.template(this.model);
    this.$el.html(compiledTemplate);
    // this.$('#todo-items').append(taskView.render().$el);
    return this
  }
});

export default TraderView;
