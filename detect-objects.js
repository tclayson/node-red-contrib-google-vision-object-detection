module.exports = function (RED) {
  const NODE_TYPE = "google-vision-object-detection";
  const vision = require('@google-cloud/vision');
  const fs = require('fs');

  function DetectorNode(config) {
    
    // Set up node
    RED.nodes.createNode(this, config);
    const node = this;

    // Get Google API credentials
    const keyFilename = config.keyFilename;

    // Set up Google Vision API client
    const client = new vision.ImageAnnotatorClient({
      "keyFilename": keyFilename
    });

    /**
     * Input function
     * 
     * We are expecting either:
     * > msg.filename (image source) or...
     * > msg.payload (image binary data)
     */
    async function Input(msg) {

      let buffer = null;

      // Check for message filename
      if (msg.filename) {
        // If we have a filename we need to grab the buffer
        buffer = fs.readFileSync(msg.filename);
      } else {
        // Check if we've been given a buffer
        if (msg.payload && msg.payload instanceof Buffer) {
          buffer = msg.payload;
        } else {
          // No msg.filename and msg.payload is not a buffer.
          node.error("Neither msg.filename nor msg.payload properly supplied.");
          return;
        }
      }

      // Create request object
      const request = {
        image: {
          content: buffer
        }
      };

      // Make the request
      try {
        const [result] = await client.objectLocalization(request);
        msg.payload = result.localizedObjectAnnotations;
        node.send(msg);
      } catch(err) {
        node.error(err);
      }
    }

    // Handler for input
    node.on("input", Input);

  }

  RED.nodes.registerType(NODE_TYPE, DetectorNode);
};