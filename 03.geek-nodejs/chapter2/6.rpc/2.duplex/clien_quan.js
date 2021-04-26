const net = require('net');

const socket = new net.Socket({});

socket.connect({
  host: '127.0.0.1',
  port: 4000
});

// socket.write('good morning nodejs');

const LESSON_IDS = [
  "136797",
  "136798",
  "136799",
  "136800",
  "136801",
  "136803",
  "136804",
  "136806",
  "136807",
  "136808",
  "136809",
  "141994",
  "143517",
  "143557",
  "143564",
  "143644",
  "146470",
  "146569",
  "146582"
]

let id = Math.floor(Math.random() * LESSON_IDS.length);

socket.on('data', (buffer) => {
  const seqBuffer = buffer.slice(0, 2);
  const titleBuffer = buffer.slice(2);

  let id = Math.floor(Math.random() * LESSON_IDS.length);
  console.log(seqBuffer.readInt16BE(), titleBuffer.toString());

  socket.write(encode(id));
});

let seq = 0;

function encode(index) {
  buffer = Buffer.alloc(6);
  buffer.writeInt16BE(seq);
  buffer.writeInt32BE(
    LESSON_IDS[index], 2
  );
  console.log(seq, LESSON_IDS[index]);
  seq++;
  return buffer;
}

// 每 50 秒发一个包，模拟全双工通信
// setInterval(function () {
//   socket.write(encode(id));
// }, 50);

// 同时发100个包  TCP 沾包
for (let k = 0; k < 100; k++) {
  let id = Math.floor(Math.random() * LESSON_IDS.length);
  socket.write(encode(id));
}
