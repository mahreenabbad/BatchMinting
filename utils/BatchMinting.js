const { ethers, artifacts } = require("hardhat");

require("dotenv").config();

async function main() {
  const contractAddress = "0xF710316EBDde0b49729eF541F8d7Dc0faC1Ae5f9";

  const API = process.env.ALCHEMY_API_KEY;
  const rpcUrl = `https://eth-sepolia.g.alchemy.com/v2/${API}`;

  const provider = new ethers.JsonRpcProvider(rpcUrl, undefined, {
    staticNetwork: true,
  });
  const PRIVATE_KEY = process.env.PRIVATE_KEY1;
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);

  //   console.log("signer :", signer);

  const Artifacts = await artifacts.readArtifact("BatchMint"); // Console the ABI
  const batchMintAbi = Artifacts.abi;
  //   console.log("batchMintAbi :", batchMintAbi);

  const batchMintContract = new ethers.Contract(
    contractAddress,
    batchMintAbi,
    signer
  );

  const ticketPrice = ethers.parseEther("0.00001");

  const to = [
    "0x4D6d151F4C2eE9211274c5895A1aDe0A291D43FA",
    "0x92e74c855cffF3dfBee0B5dc5BC517d824c36AdF",
    "0x58c9780bFCD1ce7347096c93E6F2ea7Ed14B3E85",
  ];

  const value = BigInt("1"); // Convert value to BigNumber
  const totalAddresses = BigInt(to.length);
  const totalCost = ticketPrice * value * totalAddresses;
  console.log("totalCost :", totalCost);

  try {
    const mint = await batchMintContract.mintTickets(to, value, {
      value: totalCost,
    });
    console.log("mint", mint);
  } catch (error) {
    console.error("tx unsuccessful ", error);
  }

  //   function randomAddress(to) {
  //     const index = Math.floor(Math.random() * to.length); // Generates a random index
  //     return to[index];
  //   }

  //   // get random address
  //   const randomAddr = randomAddress(to);
  //   console.log(randomAddr)

  //   const fromAddress = "";
  //   const data = "some data";

  //   try {
  //     const transferTx = await batchMintContract.transfer(
  //       fromAddress,
  //       randomAddr,
  //       value,
  //       data
  //     );

  //     console.log("transferTx", transferTx);
  //   } catch (error) {
  //     console.error("Tx unsuccessful", error);
  //   }
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
