const { MerkleTree } = require("merkletreejs");
const CryptoJS = require("crypto-js");
const SHA256 = require("crypto-js/sha256");

// create tree
const leaves = ["a", "b", "c", "d", "e", "f", "g", "h"].map((x) => SHA256(x));
const tree = new MerkleTree(leaves, SHA256);
console.log("tree:", tree.toString());

// root
const root = tree.getRoot().toString("hex");
console.log("Merkle Root:", root);

// leaf "a"
const leaf = SHA256("a");
////console.log("Leaf a:", leaf);
console.log("Leaf a (hex):", leaf.toString(CryptoJS.enc.Hex));

// proof "a"
const proof = tree.getProof(leaf);
console.log("proof a:", proof);

console.log(tree.verify(proof, leaf, root)); // true

// Error
const badLeaves = ["a", "x", "c"].map((x) => SHA256(x));
const badTree = new MerkleTree(badLeaves, SHA256);
const badLeaf = SHA256("x");
const badProof = badTree.getProof(badLeaf);
console.log(badTree.verify(badProof, badLeaf, root)); // false
