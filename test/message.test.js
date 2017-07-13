var expect = require('expect');
var { generateMessage, generateLocationMessage } = require('./../utils/message');


describe('generateMessage', () => {
    it('should generate correct message oblect', () => {
        var from = 'Zaher';
        var text= 'Hello world!';

        var message = generateMessage(from, text);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});

    });
    
});

describe('generateLocationMessage', () => {
    it('should generate correct location oblect', () => {
        var from = 'Zaher';
        var lat= 25.55555;
        var long=75.99999;
        var url = 'https://www.google.com/maps?q=25.55555,75.99999';
        var imgUrl = 'https://maps.googleapis.com/maps/api/staticmap?center=25.55555,75.99999&size=250x150&zoom=15&scale=1&markers=color:red|lable:S|25.55555,75.99999'

        var location = generateLocationMessage(from, lat,long);
        expect(location.createdAt).toBeA('number');
        expect(location).toInclude({from, url, imgUrl});
    });
    
});