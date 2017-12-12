import Backbone from 'backbone'

const QuoteView = Backbone.View.extend({
  initialize(params){
    this.template = params.template;
  },

  render(){
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },

  events: {
    'click button.btn-buy': 'buyQuote',
    'click button.btn-sell': 'sellQuote'
  },

  buyQuote: function(event){
  
  },

  sellQuote: function(event){

  }
});

export default QuoteView;
