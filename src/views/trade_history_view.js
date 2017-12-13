import Backbone from 'backbone';
import Quote from '../models/quote';


const TradeHistoryView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    console.log(params);
    this.bus = params.bus;
    this.listenTo(this.bus, 'trade', this.renderTrade);
  },

  // el: '#current-trade', //not sure about this
  renderTrade(trade) {
    this.trade = trade;
    this.render();
  },
  render() {
    // if (this.model) { //if I have a model
      console.log('rendering current Trade');
      console.log(this.trade);
      const compiledTemplate = this.template(this.trade);

      this.$el.append(compiledTemplate);
      // this.$el.html(`<h2>${this.model.get('symbol')}</h2>`)
      // this.$el.append(`<h3>${this.model.get('assignee')}</h3>`)
      console.log(this);
    // // this.model.each((quote)=> {
    //   const tradeHistoryView = new TradeHistoryView({
    //     model: quote,
    //     template: this.template,
    //     tagName: 'span',
    //     className: 'trade',
      // this.$('#trades').append(quoteView.render().$el);
    return this;
  },
  // events: {
  //   'click button.btn-buy': 'trade',
  //   'click button.btn-sell': 'trade',
  // },
  // trade(event){
  //   console.log("you traded something");
  //   console.log(event);
  //   this.$('#trades').append(TradeHistoryView.render().$el);
  // },
});

export default TradeHistoryView;
