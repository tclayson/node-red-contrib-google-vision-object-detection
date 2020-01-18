# node-red-contrib-google-vision-object-detection

This is a Node Red node that takes an image input, sends it to the Google Vision API and returns a list of objects from the image along with the confidence of each object and the bounding verticies for drawing a box around the image.

## Installation

Please follow the Node-RED [documentation](https://nodered.org/docs/getting-started/adding-nodes) to install `node-red-contrib-google-vision-object-detection`.

## Google Cloud Credentials

The node created in this package requires Google Cloud Service Credentials to run.

In your Google Cloud Project please add Billing to your account and then add the Vision API.

The credentials for a service account can be acquired from the [Google Cloud APIs & Services](https://console.cloud.google.com/apis/credentials) menu. After you finish creating a service account key, it will be downloaded in JSON format and saved to a local file.

In the node configuration you have to supply the path to the JSON credentials file.

## How to use

This package creates a new node in your Node Red instance called `google vision object detection` under the `Vision` category in your node list.

![Google Vision Object Detection node in Node Red](https://imgur.com/Mmkw2JN.png)

Drag this node into your flow.

Double click on the node to set the path to your Google Cloud services credentials JSON file.

Input a `msg` object with either of the following:

* `msg.filename` a relative path to the image file you wish to process (on your local filesystem)
* `msg.payload` a Buffer representation of the image

See the below example for more information.

## Example flow

Copy the below JSON and use "import" in node red to import this flow.

![Google Vision Object Detection node in use in a flow](https://imgur.com/KYIeaAc.png)

```json
[{"id":"70d78f0c.daa64","type":"google-vision-object-detection","z":"bde1cd55.74f0b","keyFilename":"/path/to/SERVICE_ACCOUNT.JSON","name":"","x":490,"y":240,"wires":[["c388a09c.42d5"]]},{"id":"13344e52.cd82a2","type":"http request","z":"bde1cd55.74f0b","name":"","method":"GET","ret":"bin","paytoqs":false,"url":"https://placekitten.com/600/600","tls":"","persist":false,"proxy":"","authType":"","x":290,"y":240,"wires":[["70d78f0c.daa64"]]},{"id":"8ccef21c.f0f1b","type":"inject","z":"bde1cd55.74f0b","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":100,"y":240,"wires":[["13344e52.cd82a2"]]},{"id":"c388a09c.42d5","type":"debug","z":"bde1cd55.74f0b","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","x":690,"y":240,"wires":[]}]
```
