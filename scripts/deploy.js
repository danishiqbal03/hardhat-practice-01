const main = async ()=>{
    [deployer] = await ethers.getSigners();
    Token = await ethers.getContractFactory("Token");
    danishToken = await Token.deploy();
    console.log("Token Address ",danishToken.address);
}

main()
.then(()=>process.exit(0))
.catch((error)=>{
    console.log(error);
    process.exit(1);
})