$(document).ready(function () {
    var socket = io.connect('http://localhost:3000');
    socket.on('chat message received', function (data) {
        console.log(data);
        let receivedMessage = JSON.parse(data);
        appendMessage(receivedMessage.msg);
    });

    var $inputBox = $('input#msg');
    var $discussionArea = $('#discussionArea');

    var $chatForm = $('form#chatInput');

    $inputBox.prop("disabled", false).focus();
    $('#loader').hide();
    $chatForm.fadeIn();
    $chatForm.on('submit', function (e) {
        e.preventDefault();
        let message = $inputBox.val();
        socket.emit('chat message', {msg: message});
        $inputBox.val('').focus();
    });

    var appendMessage = function (msg) {
        $discussionArea.append('<div class="msg">' + msg + '</div>');
    };
});
