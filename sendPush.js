var gcm = require('node-gcm');

exports.send = function (contents, clientKey) {
    var message = new gcm.Message();
    var message = new gcm.Message({
        collapseKey: 'ClothingPocket',
        delayWhildIdle: true,
        timeToLive: 3,
        data: {
            contents: contents
        }
    });
    var server_access_key = "AIzaSyDTpSmrQ2hSF9wk2AXLuW1yWxf4bl3vdWw";
    var sender = new gcm.Sender(server_access_key);

    var registration_id = clientKey;
    sender.send(message, registration_id, 4, function (err, result) {
        console.log(result);
    });
}