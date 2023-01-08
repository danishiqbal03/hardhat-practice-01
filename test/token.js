const {expect} = require("chai");

describe("Token Contract", function(){
    let Token;
    let danishToken,totalSupply;
    let owner,addr1,addr2,addrs;

    beforeEach(async()=>{
        [owner,addr1,addr2,...addrs] = await ethers.getSigners();
        Token = await ethers.getContractFactory("Token");
        danishToken = await Token.deploy();
        totalSupply = await danishToken.totalSupply();
    });

    describe("Deployment",()=>{
        it("Should set the right owner",async()=>{
            const ownerBalance = await danishToken.balanceOf(owner.address);
            expect(totalSupply).to.equal(ownerBalance);
        })

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
        })
    })





})