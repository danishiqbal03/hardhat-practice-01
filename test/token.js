const {expect} = require("chai");

describe("Token Contract", function(){
    it("Deployment should assign the total supply of token to the owner", async function(){
        const [owner] = await ethers.getSigners();
        console.log("Signers Object: ",owner);

        const Token = await ethers.getContractFactory("Token");
        const danishToken = await Token.deploy();

        const ownerBalance = await danishToken.balanceOf(owner.address);
        console.log("The Owner Address Balance Is: ",ownerBalance);

        expect( await danishToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Should transfer token between accounts", async function(){
        const [owner,addr1,addr2] = await ethers.getSigners();

        const Token = await ethers.getContractFactory("Token");
        const danishToken = await Token.deploy();

        await danishToken.transfer(addr1.address,10);
        expect(await danishToken.balanceOf(addr1.address)).to.equal(10);

        // await danishToken.transfer(addr2.address,20);
        // const addr2_bal = await danishToken.balanceOf(addr2.address);
        // expect( addr2_bal ).to.equal(20);

        await danishToken.connect(addr1).transfer(addr2.address,5);
        expect( await danishToken.balanceOf(addr2.address) ).to.equal(5);

        const ownerBalance = await danishToken.balanceOf(owner.address);
        const totalSupply = await danishToken.totalSupply();
        console.log("The Owner Address Balance Is: ",ownerBalance);
        console.log("The Address1 Balance Is: ",await danishToken.balanceOf(addr1.address));
        console.log("The Address2 Balance Is: ",await danishToken.balanceOf(addr2.address));
        let totalBalance = Number(await danishToken.balanceOf(addr1.address)) + Number(await danishToken.balanceOf(addr2.address));
        expect(ownerBalance).to.equal(totalSupply - totalBalance);

    })
})