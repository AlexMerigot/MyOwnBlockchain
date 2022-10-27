const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const PubSub = require('./pubsub');

const app = express();
const blockchain = new Blockchain();
const pubsub = new PubSub(blockchain);

const DEFAULT_PORT = 4000;
const ROOT_NODE_ADRESS = `http://localhost:${DEFAULT_PORT}`;

setTimeout(() => pubsub.broadcastChain(), 1000);

app.use(bodyParser.json());

app.get('/api/blocks', (req,res) => {
    res.json(blockchain.chain);
});

app.post('/api/mine', (req,res) => {
    const {data} = req.body;

    blockchain.addBlock({ data});

    pubsub.broadcastChain();

    res.redirect('/api/blocks');
})


const syncChains = () => {
    request({ url : `${ROOT_NODE_ADRESS}/api/blocks`}, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const rootChain = JSON.parse(body);

            blockchain.replaceChain(rootChain);

            console.log('replace a chain on a a sync with', rootChain);
            blockchain.replaceChain(rootChain);
        }
    });
}
// l'installation de PEER_PORT grace au Package cross-env permet d'utuliser plusieurs environnement simultanément
// dans notre cas cela servira a tester si tous les environnement reçoivent bien les block et l'update de la blockchain
let PEER_PORT;

if (process.env.GENERATE_PEER_PORT === 'true') {
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

// A REPROGRAMMER POUR S'ASSURER QUE NOUS NE BROADCASTONS PAS SUR NOTRE DEFAULT_PORT
const PORT = PEER_PORT || DEFAULT_PORT;
app.listen(PORT, () => {
    console.log(`listening at localhost:${PORT}`);

    if (PORT !== DEFAULT_PORT){
        syncChains();
    }
});