import * as hardhat from "hardhat";
import { expect, util } from "chai";
import {
  Wallet,
  Provider,
  Contract,
  utils,
  types,
  EIP712Signer,
} from "zksync-web3";
import * as hre from "hardhat";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import { BigNumber, ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { ETH_ADDRESS } from "zksync-web3/build/src/utils";
import { IERC20 } from "zksync-web3/build/typechain";
import { IERC20__factory, Wallnut__factory } from "../typechain";

const RICH_WALLET_PK =
  "0xbe79721778b48bcc679b78edac0ce48306a8578186ffcb9f2ee455ae6efeace1";

const RICH_WALLET_2_PK =
  "0x28a574ab2de8a00364d5dd4b07c4f2f574ef7fcc2a86a197f65abaec836d1959";

const ADDR = "0x5A73c07163ACAE03e59c15697f79284b3bda2F2A";

describe("Wallnut", function () {
  let provider: Provider;
  let deployer: Deployer;
  let alice: Deployer;

  async function deployWallnut(
    deployer: Deployer,
    days: number
  ): Promise<Contract> {
    const factoryArtifact = await deployer.loadArtifact("WFactory");
    const artifact = await deployer.loadArtifact("Wallnut");

    const bytecodeHash = utils.hashBytecode(artifact.bytecode);

    const factory = await deployer.deploy(
      factoryArtifact,
      [bytecodeHash],
      undefined,
      [artifact.bytecode]
    );

    const salt = ethers.constants.HashZero;

    const tx = await factory.deployAccount(
      salt,
      deployer.zkWallet.address,
      days
    );
    await tx.wait();

    const abiCoder = new ethers.utils.AbiCoder();

    const wallnutAddress = utils.create2Address(
      factory.address,
      await factory.aaBytecodeHash(),
      salt,
      abiCoder.encode(["address", "uint"], [deployer.zkWallet.address, days])
    );

    return Wallnut__factory.connect(wallnutAddress, deployer.zkWallet);
  }

  beforeEach(async () => {
    provider = Provider.getDefaultProvider();
    deployer = new Deployer(hre, new Wallet(RICH_WALLET_PK).connect(provider));
    alice = new Deployer(hre, new Wallet(RICH_WALLET_2_PK).connect(provider));
  });

  it.only("allows moving the funds", async () => {
    const wallnut = await deployWallnut(deployer, 0);

    await (
      await deployer.zkWallet.sendTransaction({
        to: wallnut.address,
        value: parseEther("1"),
      })
    ).wait();

    const gasPrice = await provider.getGasPrice();

    const tx = {
      from: wallnut.address,
      gasPrice,
      value: parseEther("0"),
      chainId: (await provider.getNetwork()).chainId,
      type: 113,
      nonce: await provider.getTransactionCount(wallnut.address),
      customData: {
        ergsPerPubdata: utils.DEFAULT_ERGS_PER_PUBDATA_LIMIT,
      } as types.Eip712Meta,
    };

    const signedTxHash = EIP712Signer.getSignedDigest(tx);

    const signature = ethers.utils.joinSignature(
      deployer.zkWallet._signingKey().signDigest(signedTxHash)
    );

    tx.customData = {
      ...tx.customData,
      customSignature: signature,
    };

    await (
      await provider.sendTransaction(
        utils.serialize({
          ...tx,
        })
      )
    ).wait();
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

    it.skip("fails if the user is not authorized", async function () {
      const name = "Family Member Name";

      const wallnut = await deployWallnut(deployer, 0);

      await (
        await wallnut.connect(alice.zkWallet).addMember(ADDR, name, "pfp")
      ).wait();
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
