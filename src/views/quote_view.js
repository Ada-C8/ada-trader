import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
  // this will run any time you create a new instance
  initialize(params) {
    this.template = params.template;

    // listens for change events on models and calls render to redraw the view. Any time the model changes it triggers a change event
    this.listenTo(this.model, 'change', this.render);
  },

  // Events Ojects
  events: {
    'click button.btn-buy' : 'buyStock',
    'click button.btn-sell' : 'sellStock',
  },

  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },

  buyStock() {
    this.model.buy();
  },

  sellStock() {
    this.model.sell();
    this.testMethod();
  },

  testMethod() {
    console.log('I can chain a method!');
  }

});

export default QuoteView;
