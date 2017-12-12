import Backbone from 'backbone';
import Quote from '../models/quote';

const TradeView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'change', this.render);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    return this;
  },
  events: {
    'click button.btn-buy': function() {
      console.log(this.model);
      // this.model.add(new Quote({task_name: "Put rendering logic in Backbone Views", assignee: "Me"}));
    },
    'click .btn-sell': function() {this.model.sell();},
  },
});

export default TradeView;
