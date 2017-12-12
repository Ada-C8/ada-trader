import BackBone from 'backbone';
import Quote from '../models/quote';

const QuoteView = BackBone.View.extend({

  initialize(params) {
    this.template = params.template;

    this.listenTo(this.model, 'change', this.render);
  },

  render() {
    const compiledTemplate = this.template(this.model.toJSON());

    this.$el.html(compiledTemplate);

    ////some other stuff here?

    return this;
  },

  events: {
    //listen for buy and sell buttons
  },

  //buy method

  //sell method



})

export default QuoteView;
