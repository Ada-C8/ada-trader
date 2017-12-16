import Backbone from 'backbone';

const QuoteView = Backbone.View.extend({
  initialize(params){
    this.template = params.template;
    this.listenTo(this.model, 'change', this.render);
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

  buyQuote: function(){
    this.model.set('buy', true);
    this.trigger('addTrade', this);
    this.model.buy();
  },

  sellQuote: function(){
    this.model.set('buy', false);
    this.trigger('addTrade', this);
    this.model.sell();
  }
});

export default QuoteView;
