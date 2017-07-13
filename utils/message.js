var moment = require('moment');
var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf(),
    };

};
var generateLocationMessage = (from, lat, long) => {
    return{
        from,
        url:`https://www.google.com/maps?q=${lat},${long}`,
        imgUrl :`https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&size=250x150&zoom=14&scale=1&markers=color:red|lable:S|${lat},${long}&key=AIzaSyAYUd8MPnfYjLk_ypiWm8_jTBhUIhRxf6g`,
        createdAt: moment().valueOf(),
    }
}
module.exports = {
    generateMessage,
    generateLocationMessage
}