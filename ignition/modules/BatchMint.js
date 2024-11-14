const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const URI =
  "https://aquamarine-dear-whitefish-514.mypinata.cloud/ipfs/QmXNKPECqexdk6rZMkjeUku1EMynBtvpsQxoqyFhTBNXQv";

module.exports = buildModule("BatchMintModule", (m) => {
  const batchMint = m.contract("BatchMint", [URI]);

  return { batchMint };
});
// contract Address 0xF710316EBDde0b49729eF541F8d7Dc0faC1Ae5f9
