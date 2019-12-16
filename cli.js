const macadam = require('./index.js');
const fs = require('fs');
// let deviceInfo = macadam.getDeviceInfo();
let config = macadam.getDeviceConfig(0);
console.log(JSON.stringify(config, null, 2));

// console.log(JSON.stringify(macadam));
// console.log(JSON.stringify(deviceInfo, null, 2));


async function test() {
  let capture = await macadam.capture({
    deviceInfo: 0, // Index relative to the 'macadam.getDeviceInfo()' array
    displayMode: macadam.bmdModeHD1080i50,
    pixelFormat: macadam.bmdFormat8BitYUV,
  });
  for ( let x = 0 ; x < 1 ; x++ ) {
    let frame = await capture.frame();
    console.log(frame.video.height);
    console.log(frame.video.width);
    console.log(frame.video.frameDuration);
    console.log(frame.video.frameTime);
    console.log(frame.video.timecode);
    fs.writeFileSync('./frameData.js', JSON.stringify(frame.video.data));
  }
  capture.stop();
}

test();
