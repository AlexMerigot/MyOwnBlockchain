# MyOwnBlockchain
Trying to build my Own Blockchain following an Udemy Mooc

Here is the summary of what has been accomplished so far :

Block Back-end : 

- Set up the overall blockchain application.

- Created the basic building block of the blockchain - with blocks themselves!

- Started a test-driven development approach to the project.

- Built the genesis block - to get the blockchain going.

- Added functionality to mine a block - create a new block for the blockchain.

- Developed the important sha-256 hash function.

- Applied the hash to mine a block.

Chain Back-end :

- Created the fundamental blockchain class.

- Developed functionality to validate the blockchain, to allow for chain replacement.

- Implemented chain replacement.

- Investigated stubbing console output in tests to keep the output clean.

Proof-of-work Back-end : 

- Implemented the proof of work system by adding a difficulty and nonce value to each block.

- Adjusted the difficulty for a block to ensure that blocks are mined at a rate which approaches a set mining rate for the system.

- Investigated the proof of work system by writing a script which checked how will the dynamic difficulty adjusted the system to approach the mine rate.

API & Network (broadcasting blockchain : 

- Set up an express API to allow for interaction to the backend through HTTP requests.

- Created a GET request to read the blockchain.

- Added a POST request to write new blocks to the blockchain.

- Implemented a real-time messaging network through Redis or PubNub.

- Added the ability to broadcast chains.

- Started peers through alternate ports, and broadcasted chains when blocks were mined through the api.

- Synchronized chains when new peers connected to the network.

- Optimized the implementation to avoid redundant interaction.
