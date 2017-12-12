import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params){
    this.template = params.template;

    this.listenTo(this.model, 'change', this.render)
  },
  render(){
    const compiledTemplate =  this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  events:{
    'click button.btn-buy': 'buyQuote',
    'click button.btn-sell': 'sellQuote',
  },
  buyQuote(){
    console.log('banana');
    this.model.buy();
    return this;
  },
  sellQuote(){
    this.model.sell();
    return this;
  },

});
export default QuoteView;
