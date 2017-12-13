import Trade from 'models/trade';

describe('Trade spec', () => {
  let trade;
  beforeEach(() => {
    trade = new Trade({

    });
  });

  describe('defaults', () => {
    it('has a default buy', () => {
      expect(trade.get('buy')).toBeTruthy;
    });
    it('has a default price', () => {
        expect(trade.get('buy')).toBeTruthy;
    });
    it('has a default symbol', () => {
        expect(trade.get('buy')).toBeTruthy;
    });
  });


});
