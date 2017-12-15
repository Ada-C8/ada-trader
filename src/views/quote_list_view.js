import Backbone from 'backbone';
import Quote from '../models/quote';
import QuoteList from '../collections/quote_list';
import _ from 'underscore';

const QuoteListView = Backbone.View.extend({
  initialize(params){
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render)
    // TODO to change click, I want to add the element to the list after they click buy or sellQuote
  },
  events: {
    'click .btn-buy': 'addTraderBuy',
    'click .btn-sell': 'addTraderSell'
  },
  addTraderBuy(){
    console.log("inside the addTraderBuy");
  },
  addTraderSell(){
    console.log('inside the addTraderSell');
  },
  // copy
//   addTraderBuy(event){
//     event.preventDefault();
// // TODO get form data
//     const formData = this.getFormData();
//     const newTask = new Task(formData);
//
//       this.model.add(newTask);
//
  // endcopy
  render(){
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this
  }
});

export default QuoteListView;
