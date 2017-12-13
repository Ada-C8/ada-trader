import Backbone from 'backbone';

const OrdersView = Backbone.View.extend({
  initialize(params){
    this.bus = params.bus;
    this.template = params.template;
    this.allSymbols = params.allSymbols;
    console.log(this.allSymbols);
    // this.render()
    // this.listenTo(this.model, 'update', this.render);
  },

  render() {
    console.log(this.allSymbols);

    this.allSymbols.forEach((symbol) => {
      console.log('In OrdersView render');
      // this.$('select[name="symbol"]').append(`<option>${symbol}</option>`)
      this.$('form select').append(`<option>${symbol}</option>`)

    });

    // $.each(items, function (i, item) {
    //     $('#mySelect').append($('<option>', {
    //         value: item.value,
    //         text : item.text
    //     }));
    // });
    return this;
  },

});

export default OrdersView;
