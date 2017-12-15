import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  initialize(params){
    this.bus = params.bus;
    this.template = params.template;
    this.listenTo(this.model, 'change', this.render)
  },
  events: {
    'click .btn-buy': 'buyQuote',
    'click .btn-sell': 'sellQuote',
  },
  buyQuote(){
    this.model.buy(),
    this.bus.trigger('buyQuote', this.model)
    console.log("inside buyQuote");
  },
  sellQuote(){
    // console.log("inside sell");
    this.model.sell()
  },
  render(){
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this
  }
});


export default QuoteView;
