const { ethers } = require("hardhat")

const main = async () => {
    const WhiteListContract = await ethers.getContractFactory("WhiteList")
    const DeployWhiteListContract = await WhiteListContract.deploy(10)
    console.log(`Contract Address: ${DeployWhiteListContract.address}`)
    await DeployWhiteListContract.deployed()
}

main()
.then(() => process.exit(0))
.catch(error => {
    console.error(error)
    process.exit()
})