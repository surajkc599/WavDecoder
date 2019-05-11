'use strict'

self.importScripts('WavDecoder.js');

const decoder = new WavDecoder();

self.onmessage = event => {
  if (event.data.decode) {
    const decoded = decoder.decodeChunkSync(event.data.decode);

    // convert decoded data to Transferable ArrayBuffer for performant postMessage
    decoded.channelData = decoded.channelData.map(arr => arr.buffer);
    self.postMessage(decoded, decoded.channelData);
  }
}
