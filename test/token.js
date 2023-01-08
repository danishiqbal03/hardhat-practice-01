const {expect} = require("chai");

describe("Token Contract", function(){
    let Token;
    let danishToken,totalSupply;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function(){
        [owner,addr1,addr2,...addrs] = await ethers.getSigners();
        Token = await ethers.getContractFactory("Token");
        danishToken = await Token.deploy();
        totalSupply = await danishToken.totalSupply();
    });

    describe("Deployment",()=>{
        it("Should set the right owner",async function(){
            const ownerBalance = await danishToken.balanceOf(owner.address);
            expect(totalSupply).to.equal(ownerBalance);
        })
    });

    describe("Token Transactions",()=>{
        it("Should transfer token between accounts", async function(){
            await danishToken.transfer(addr1.address,10);
            expect(await danishToken.balanceOf(addr1.address)).to.equal(10);

            // await danishToken.transfer(addr2.address,20);
            // const addr2_bal = await danishToken.balanceOf(addr2.address);
            // expect( addr2_bal ).to.equal(20);

            await danishToken.connect(addr1).transfer(addr2.address,5);
            expect( await danishToken.balanceOf(addr2.address) ).to.equal(5);

            const ownerBalance = await danishToken.balanceOf(owner.address);
            
            let totalBalance = Number(await danishToken.balanceOf(addr1.address)) + Number(await danishToken.balanceOf(addr2.address));
            expect(ownerBalance).to.equal(totalSupply - totalBalance);
        });
        it("Should fail if sender does not have enough tokens", async function(){
            const ownerBalance = await danishToken.balanceOf(owner.address);
            console.log(ownerBalance);
            await expect( danishToken.connect(addr1).transfer(owner.address,5)).to.be.revertedWith("account has insufficient balance");

            expect(await danishToken.balanceOf(owner.address)).to.equal(ownerBalance);

        });
    });
})