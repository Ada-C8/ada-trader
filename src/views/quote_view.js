import Backbone from 'backbone';
import Quote from '../models/quote';


const QuoteView = Backbone.View.extend({

initialize(params) {
  this.template = params.template;
// params is an object we pass in
// contains standard values bb expects
// out params will contain an underscore template
//in initialze we store the template from params in its own property called template. One per each view. 
}, //init

render() {
  const compiledTemplate =
  this.template(this.model.toJSON());

  this.$el.html(compiledTemplate);


  return this;


}, //render



}); //end of Quote View


export default QuoteView;
