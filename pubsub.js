const PubNub = require('pubnub');

const credentials = {
    publishKey: "pub-c-2de68793-5482-4b81-8635-ea13e34fe23d",
    subscribeKey: "sub-c-05a0daf1-87cc-485b-8266-00ca223ccf4f",
    secretKey: "sec-c-ZWNhNDRmYzAtYjBkMC00MGJjLWIyYTYtMjdiM2NjNGZhYWRl",
    userId: "myUniqueuserId"
}

// Redis est une applicaiton qui stocke les données dans la mémoire 
//pour communiquer ou recevoir très rapidement de l'information
//Nous l'utiliserons pour faire communiquer les "Nodes" en eux.

const CHANNELS = {
    TEST:'TEST',
    BLOCKCHAIN:'BLOCKCHAIN'
};

class PubSub{
    constructor(blockchain){
        this.blockchain = blockchain;

        this.pubnub = new PubNub(credentials);

        this.pubnub.subscribe({channels: Object.values(CHANNELS) });

        this.pubnub.addListener(this.listener());
    }

    listener(){
        return {
            message: messageObject => {
                const {channel, message} = messageObject;
                console.log(`Message received. Channel: ${channel}. Message: ${message}`);
                
                const parsedMessage = JSON.parse(message);

                if (channel === CHANNELS.BLOCKCHAIN) {
                    this.blockchain.replaceChain(parsedMessage);
                }
            }
        };
    }

    publish({channel, message}){
        this.pubnub.unsubscribe(channel, () => {
            this.pubnub.publish({channel,message}, () => {
                this.pubnub.subscribe({channels: Object.values(CHANNELS) });
            });
        })

        this.pubnub.publish({channel,message});
    }

    broadcastChain(){
        this.publish({
            channel:CHANNELS.BLOCKCHAIN,
            message: JSON.stringify(this.blockchain.chain)
        })
    }
}

const testPubSub = new PubSub();
testPubSub.publish({channel: CHANNELS.TEST, message:'hello world!'});

module.exports = PubSub;