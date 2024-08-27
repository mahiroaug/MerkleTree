const { MerkleTree } = require("merkletreejs");
const CryptoJS = require("crypto-js");
const SHA256 = require("crypto-js/sha256");

const keccak256 = require("keccak256");

// List of public Ethereum addresses
let addresses = [
  "0x0000000000000000000000000000000000000001",
  "0x0000000000000000000000000000000000000002",
  "0x0000000000000000000000000000000000000003",
  "0x0000000000000000000000000000000000000004",
  "0x0000000000000000000000000000000000000005",
  "0x0000000000000000000000000000000000000006",
  "0x0000000000000000000000000000000000000007",
  "0x0000000000000000000000000000000000000008",
];

//// 01 create Tree
const leaves = addresses.map((addr) => keccak256(addr));
const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
console.log("Merkle Tree:\n", merkleTree.toString());

const RootHash = merkleTree.getHexRoot();
console.log("RootHash:", RootHash);

//// 02 proof
// leaf "0x0000000000000000000000000000000000000003"
const myLeaf = keccak256("0x0000000000000000000000000000000000000003");
console.log("myLeaf:", myLeaf.toString("hex"));

const myProof = merkleTree.getProof(myLeaf);
console.log(
  "myProof:",
  myProof.map((item) => ({
    position: item.position,
    data: item.data.toString("hex"),
  }))
);

//// 03 verify
console.log(merkleTree.verify(myProof, myLeaf, RootHash)); // true
