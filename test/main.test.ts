import { expect } from "chai";
import { Wallet, Provider, Contract } from "zksync-web3";
import * as hre from "hardhat";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

const RICH_WALLET_PK =
  "0xbe79721778b48bcc679b78edac0ce48306a8578186ffcb9f2ee455ae6efeace1";

async function deployWallnut(
  deployer: Deployer,
  days: number
): Promise<Contract> {
  const artifact = await deployer.loadArtifact("Wallnut");

  return await deployer.deploy(artifact, [deployer.zkWallet.address, days]);
}

const ADDR = "0x5A73c07163ACAE03e59c15697f79284b3bda2F2A";

describe("Wallnut", function () {
  it("adds a family member", async function () {
    const name = "Family Member Name";

    const provider = Provider.getDefaultProvider();

    const wallet = new Wallet(RICH_WALLET_PK, provider);
    const deployer = new Deployer(hre, wallet);

    const wallnut = await deployWallnut(deployer, 0);

    const tx = await wallnut.addMember(ADDR, name, "pfp");
    await tx.wait();

    const member = await wallnut.family(ADDR);

    expect(member.name).to.eq(name);
  });
});
