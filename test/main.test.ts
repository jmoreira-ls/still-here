import * as hardhat from "hardhat";
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
  let provider: Provider;
  let wallet: Wallet;
  let deployer: Deployer;

  beforeEach(() => {
    provider = Provider.getDefaultProvider();
    wallet = new Wallet(RICH_WALLET_PK, provider);
    deployer = new Deployer(hre, wallet);
  });

  describe("addMember", () => {
    it("adds a family member", async function () {
      const name = "Family Member Name";

      const wallnut = await deployWallnut(deployer, 0);

      await (await wallnut.addMember(ADDR, name, "pfp")).wait();

      const member = await wallnut.family(ADDR);

      expect(member.name).to.eq(name);
      expect(member.active).to.eq(true);
    });
  });

  describe("removeMember", () => {
    it("removes a family member", async function () {
      const wallnut = await deployWallnut(deployer, 0);

      await (await wallnut.addMember(ADDR, "Family Member Name", "pfp")).wait();

      await (await wallnut.removeMember(ADDR)).wait();

      const member = await wallnut.family(ADDR);

      expect(member.active).to.eq(false);
    });
  });

  describe("stillHere", () => {
    it("updates the last timestamp", async function () {
      const wallnut = await deployWallnut(deployer, 0);

      await (await wallnut.addMember(ADDR, "Family Member Name", "pfp")).wait();

      const firstTimesamp = await wallnut.lastTimestamp();

      await new Promise((resolve) => setTimeout(resolve, 2000));

      await (await wallnut.stillHere()).wait();

      const secondTimesamp = await wallnut.lastTimestamp();

      expect(firstTimesamp.lt(secondTimesamp)).to.eq(true);
    });
  });
});
