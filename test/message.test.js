var expect = require('expect');
var { generateMessage } = require('./../utils/message');


describe('generateMessage', () => {
    it('should generate correct message oblect', () => {
        var from = 'Zaher';
        var text= 'Hello world!';

        var message = generateMessage(from, text);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
        
    });
});