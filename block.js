const hexToBinary = require('hex-to-binary'); //Trouver le nombre de zéro en binaire plutot qu'en hexadécimal 
const {GENESIS_DATA, MINE_RATE} = require('./config.js');
const cryptoHash = require('./crypto-hash');


class Block {
    constructor({timestamp, lastHash, data, hash, nonce, difficulty}) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.data = data;
        this.hash = hash;    
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    static genesis() {
        return new this(GENESIS_DATA);
    }

    static mineBlock({lastBlock, data}){
        let hash, timestamp;
        let lastHash = lastBlock.hash;
        let {difficulty} = lastBlock;
        let nonce = 0;

        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty({originalBlock: lastBlock, timestamp});
            hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
        } while (hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty));
        
        return new this ({
            timestamp,
            lastHash,
            data,
            difficulty,
            nonce,
            hash: cryptoHash(timestamp, lastHash,data, nonce,difficulty)
        });
    
    }

    static adjustDifficulty({ originalBlock, timestamp}) {
        const {difficulty} = originalBlock;

        if (difficulty < 1) return 1;

        if ((timestamp - originalBlock.timestamp) > MINE_RATE) return difficulty -1;
            return difficulty +1;
    }
}

module.exports = Block;