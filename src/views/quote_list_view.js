import Backbone from 'backbone';
import QuoteView from './quote_view';
import Quote from '../models/quote';

const QuoteListView = Backbone.View.extend({
  initialize(params){
    this.template = params.template;
    this.hamRadio = params.hamRadio;
    // this.uniqueQuoteSymbols();
    // this.listenTo(this.model, 'change', this.uniqueQuoteSymbols);
    this.listenTo(this.model, 'update', this.render);
    // this.listenTo(this.model, 'update', this.uniqueQuoteSymbols);

  },
  events:{

    // this.listenTo(this.hamRadio, 'bought_quote', this.setModel);
    // this.listenTo(this.hamRadio, 'sold_quote', this.setModel);
    // 'click #add-new-task': 'addTask',
  },
  updateStatusMessageFrom(messageHash){
    // const $statusMessage = this.$('#status-messages');
    // $statusMessage.empty();
    // Object.keys(messageHash).forEach((messageType)=>{
    //   messageHash[messageType].forEach((message) =>{
    //     $statusMessage.append(`<li>${message}<li>`);
    //   });
    // });
    // $statusMessage.show();
  },
  updateStatusMessage(message){
    // this.updateStatusMessageFrom({
    //   task: message,
    // });
  },
  addQuote(event){
    event.preventDefault();
    const formData = this.getFormData();
    const newQuote = new Quote(formData);
    if(newQuote.isValid()){
      this.model.add(newQuote);
      this.clearFormData();
      this.updateStatusMessage(`${newQuote.get('quote_name')} Created!`);
    }else{
      console.log('Something went wrong!');
      this.updateStatusMessageFrom(newQuote.validationError);
    }
  },
  clearFormData(){
    ['quote_name', 'assignee'].forEach((field) => {
      this.$(`#add-quote-form input[name=${field}]`).val('');
    });
  },
  getFormData(){
    const quoteData = {};
    ['quote_name', 'assignee'].forEach((field) =>{
      const val = this.$(`#add-quote-form input[name=${field}]`).val();
      if (val !== ''){
        quoteData[field]=val;
      }
    });
    return quoteData;
  },
  render(){
    // backbone has it worked out that when using jquery only searches within this specific view
    this.$('#quotes').empty();

    this.model.each((quote) => {
      const quoteView = new QuoteView({
        model: quote,
        template: this.template,
        tagName: 'li',
        className: 'quote',
        hamRadio: this.hamRadio,
      });
      this.$('#quotes').append(quoteView.render().$el);

    });
    this.uniqueQuoteSymbols();
    return this;
  },
  uniqueQuoteSymbols(){
    // this.$('#quotes').empty();
    let quoteSymbols = [];
    this.model.each((quote) => {
      let symbol = quote.get('symbol');
      if( !quoteSymbols.includes(symbol)){
        quoteSymbols.push(symbol);
      };
    });
    console.log('apples');
    // debugger;
    this.hamRadio.trigger('render_order_dropdown', quoteSymbols);
    console.log('jelly');
    return quoteSymbols;
  },

});

export default QuoteListView;
