var expect = require('expect');
var { isRealString } = require('../utils/validation');

describe('isRealString', () => {
    
    it('should reject non-string values', () => {
        var res = isRealString(98);
        expect(res).toBe(false);
    });

    it('should reject string with only spaces', () => {
        var res = isRealString('       ');
        expect(res).toBe(false);
    });

    it('should allow string with none-space chars', () => {
        var res = isRealString('  Zaher\'s Room  ');
        expect(res).toBe(true);
    });

});


