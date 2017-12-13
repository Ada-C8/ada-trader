import Backbone from 'backbone';
import Quote from '../models/quote';

const QuoteView = Backbone.View.extend({
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
    'click button.btn-buy': 'buyQuote',
    'click button.btn-sell': 'sellQuote',
  },

  buyQuote(event) {
    console.log('buying quote');
    // append li to ul with id="trades"
    this.model.buy();
    this.trigger('add_trade', this.model);
  },

  sellQuote(event) {
    console.log('selling quote');
    this.model.sell();
  },

  // editTask(event) {
  //   // console.log('Editing task');
  //   // console.log(event);
  //   // console.log(this);
  //   // we want to use from from TaskListView and we need to make that big view to listen to this 'edit_me' message
  //   this.trigger('edit_me', this.model);
  // },
  // selectTask(event) {
  //   this.bus.trigger('selected_task', this.model);
  // },

  // events: {
  //   // click on the button with a class of delete will execute the function deleteTask
  //   'click button.delete': 'deleteTask',
  //   'click button.toggle-complete': 'toggleCompletion',
  //   'click button.edit': 'editTask',
  //   'click': 'selectTask',
  // },
  // deleteTask(event) {
  //   // .destroy - destroys the model and all the event listeners
  //   this.model.destroy();
  //   this.remove();
  // },
  // toggleCompletion(event) {
  //   // this.$el.toggleClass('is-complete');
  //   this.model.toggleComplete();
  // },
  // editTask(event) {
  //   // console.log('Editing task');
  //   // console.log(event);
  //   // console.log(this);
  //   // we want to use from from TaskListView and we need to make that big view to listen to this 'edit_me' message
  //   this.trigger('edit_me', this.model);
  // },
  // selectTask(event) {
  //   this.bus.trigger('selected_task', this.model);
  // },

});


export default QuoteView;
