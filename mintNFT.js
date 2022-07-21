const ethers = require("ethers")
const abi = require("./abi.json")
require("dotenv").config()

async function main() {
	// NFT contract address
	const contractAddress = "0xB29eA9ad260B6DC980513bbA29051570b2115110"
	const provider = new ethers.providers.JsonRpcProvider(
		process.env.ARB_RPC_URL
	)
	const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
	const value = await provider.getStorageAt(contractAddress, 777)
	console.log(`Storage at 777 in hex: ${value}`)
	const contract = new ethers.Contract(contractAddress, abi, wallet)
	try {
		await contract.callStatic.mintNft(value)
	} catch (error) {
		console.log(error)
	}
	const txResponse = await contract.mintNft(value)
	const txReceipt = await txResponse.wait(1)
	console.log(txReceipt.hash)
}

main()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error(err)
		process.exit(1)
	})
