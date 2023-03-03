import { ethers } from 'hardhat';
import fs from 'fs';
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";


async function main() {

    const file = fs.readFileSync("usdtAddress.csv")

    const allLines = file.toString("ascii").split("\n")
    console.log("all addresses collated to an array");

    const res = []

    for (let i = 1; i < allLines.length; i++) {
        res.push(allLines[i].split(", "));
        console.log(allLines[i]);
    }
    console.log(`ready to go`);

    const tree = StandardMerkleTree.of(res, ["address", "uint256"]);

    console.log('Merkle Root:', tree.root);

    fs.writeFileSync("tree.json", JSON.stringify(tree.dump()));

    //Obtaining Proof 
    //@ts-ignore
    const merkleTree = StandardMerkleTree.load(JSON.parse(fs.readFileSync("tree.json")));

    for (const [i, v] of tree.entries()) {
        if (v[0] === '0x555a73D85ED1Ce9Fe7D194e574A17771013CE9c3') {
            // (3)
            const proof = tree.getProof(i);
            console.log('Value:', v);
            console.log('Proof:', proof);
        }
    }



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

