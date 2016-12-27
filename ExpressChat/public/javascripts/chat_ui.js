function divEscapedContentElement(message) {
  return $('<div></div>').text(message);
}

function divSystemContentElement(message) {
  return $('<div></div>').html(`<i>${message}<i>`)
}

function processUserInput(chatApp, spcket) {
  let message = $('#send-message').val();
  let systemMessage;
  // 如果用户输入的内容以/开头，将其作为聊天命令
  if (message.charAt(0) === '/') {
    systemMessage = chatApp.processCommand(message);
    if (systemMessage) {
      $('#message').append(divSystemContentElement(systemMessage));
    }
  } else {
    chatApp.sendMessage($('#room').text(), message);
    // 将非命令输入广播给其他用户
    $('#message').append(divEscapedContentElement(message));
    $('#message').scrollTop($('#message').prop('scrollHeight'));
  }
  $('#send-message').val('');
}

const socket = io();

$(document).ready(() => {
  const chatApp = new Chat(socket);
  // 显示更名尝试的结果
  socket
    .on('nameResult', (result) => {
      let message;
      if (result.success) {
        message = `you are konwn as ${result.name}.`;
      } else {
        message = result.message;
      }
      $('message').append(divSystemContentElement(message));
    })
    .on('joinResult', (result) => {
      $('#room').text(result.room);
      $('#message').append(divSystemContentElement('Room changed.'));
    })
    .on('message', (message) => {
      let newElement = $('<div></div>').text(message.text);
      $('#message').append(newElement);
    })
    .on('rooms', (rooms) => {
      $('room-list').empty();
      for (let room in object) {
        room = room.substring(1, room.length);
        if (room != '')
          $('#room-lite').append(divEscapedContentElement(room));
      }
      $('#room-list div').click(() => {
        chatApp.processCommand(`/join${$(this).text()}`);
        $('#send-message').focus();
      });
    });
  setInterval(() => { socket.emit('rooms') }, 1000)
  $('#send-message').focus();
  $('#send-form').submit(() => {
    processUserInput(chatApp, socket);
    return false;
  });
});