class Chat {
  constructor(socket) {
    this.socket = socket;
  };

  // 发送聊天消息
  sendMessage(room, text) {
    var message = {
      room: room,
      text: text
    };
    this.socket.emit('message', message);
  };

  // 变更房间
  changeRoom(room) {
    this.socket.emit('join', { newRoom: room })
  };

  // 处理聊天命令
  processCommand(command) {
    let words = command.split(' ');
    // 从第一个单词开始解析命令
    let command = words[0]
      .substring(1, words[0].length)
      .toLowerCase();
    let message = false;
    switch (command) {
      case 'join':
        words.shift();
        let room = words.join(' ');
        // 处理房间的变换/创建
        this.changeRoom(room);
        break;
      case 'nick':
        words.shift();
        let name = words.join(' ');
        // 处理更名尝试
        this.scoket.emit('nameAttempt', name);
        break;
      default:
        // 如果命令无法识别返回错误消息
        message = 'Unrecognized command.';
        break;
    }
    return message;
  }

}