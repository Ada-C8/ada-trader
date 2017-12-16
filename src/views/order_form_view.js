import Backbone from 'backbone';

const orderFIELDS = ['symbol', 'price-target'];
const orderFieldSelector = ['select', 'input']


const OrderFormView = Backbone.View.extend({
  initialize(params){
    this.form = params.form;
    this.bus = params.bus;
  },
  // quoteData.each((quote) => {
  //   $('#dropdown').append(`<option>${quote.symbol}</option>`);
  // }),

  readOrderFormData() {
    const orderData = {};

    const $inputSymbolValue = this.$(`select[name="symbol"]`).val();;
    const $inputPriceTargert = this.$(`input[name="price-target"]`)


    const priceValue = $inputPriceTargert.val();
    console.log(`priceValue = ${priceValue}`);

    // Don't take empty strings, so that Backbone can
    // fill in default values
    orderData['symbol'] = $inputSymbolValue;
    if (priceValue != '') {
      orderData['targetPrice'] = priceValue;
    }
    $inputPriceTargert.val('');
    return orderData;
  },
  events: {
    'click button.btn-buy': 'orderBuy',
  },
  orderBuy(event) {
    event.preventDefault();
    console.log('test click orderBuy');
    let orderObject = this.readOrderFormData()
    console.log(orderObject);
  }

});
export default OrderFormView;
