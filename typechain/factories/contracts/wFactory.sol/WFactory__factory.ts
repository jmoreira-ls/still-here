/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BytesLike,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  WFactory,
  WFactoryInterface,
} from "../../../contracts/wFactory.sol/WFactory";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_wBytecodeHash",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "aaBytecodeHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "thresholdDays",
        type: "uint256",
      },
    ],
    name: "deployAccount",
    outputs: [
      {
        internalType: "address",
        name: "accountAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x000300000000000200010000000103550000006003100270000000950030019d0000009503300197000000000131034f0002000000010355000000010120018f000000000110004c0000000b0000c13d024f00560000040f024f000c0000040f0000000001000416000000000110004c0000001c0000c13d00000000010000310000009f02100039000000200300008a000000000232016f0000007f0320008c0000001e0000213d000000980100004100000000001004350000004101000039000000040200003900000000001204350000009901000041000002510001043000000000010000190000025100010430000000400300003900000000002304350000001f0210018f00000001030003670000000504100270000000000540004c0000002e0000613d00000000050000190000000506500210000000000763034f000000000707043b000000800660003900000000007604350000000105500039000000000645004b000000260000413d000000000520004c0000003d0000613d0000000504400210000000000343034f00000003022002100000008004400039000000000504043300000000052501cf000000000525022f000000000303043b0000010002200089000000000323022f00000000022301cf000000000252019f000000000024043500000096020000410000001f0310008c000000000300001900000000030220190000009601100197000000000410004c0000000002008019000000960110009c00000000010300190000000001026019000000000110004c0000004b0000c13d00000000010000190000025100010430000000800100003900000000010104330000000002000019024f024b0000040f000000200100003900000100020000390000000000120439000001200100003900000000000104390000009701000041000002500001042e00080000000000020000000001000410000080020210008c000000710000613d0000000002000411000080010220008c000000710000613d0000009a020000410000000000200439000000040200003900000000001204390000009b0100004100008002020000390000000003000415000000080330008a00000020033000c9024f02190000040f000000ff01000039000000070110024f000000000110004c000000810000613d000000080100035f000000000101043b000000000110004c000000710000c13d0000000001000019000002500001042e0000008007000039000000400600003900000000007604350000000002000031000000030120008c0000007f0000a13d0000000101000367000000000301043b000000e0033002700000009c0430009c000000830000613d0000009d0130009c0000007f0000c13d024f00d70000040f00000000010000190000025100010430000000000100001900000251000104300000000003000416000000000330004c000000950000c13d000000040220008a00000096030000410000005f0420008c000000000400001900000000040320190000009602200197000000000520004c0000000003008019000000960220009c00000000020400190000000002036019000000000220004c000000970000c13d00000000010000190000025100010430000000000100001900000251000104300000002401100370000000000201043b0000009e0120009c0000009d0000413d000000000100001900000251000104300000000001000414000200000001001d0000000001000019000400000006001d000300000007001d000100000002001d024f024d0000040f00000001020003670000004402200370000000000202043b000000a00300003900000001040000290000000000430435000000c0030000390000000000230435000000040200002900000003030000290000000000230435000000e003000039000300000003001d00000000003204350000009f0200004100000100030000390000000000230435000000000301001900000001010003670000000401100370000000000201043b0000010401000039024f010d0000040f000001000210008a00000003030000290000000000230435000000e00210008a0000000001030019024f00f70000040f000000020100002900000095011001970000000302000029024f018e0000040f000000000301043300000020021000390000000003320019000600000000001d000500000000001d0000000001000415000000060110008a00000020011000c9024f01290000040f000000a001000041000000060110017f0000000402000029000000000202043300000000001204350000004001200210000000a101100197000000a2011001c7000002500001042e0000000001000416000000000110004c000000ec0000c13d000000040100008a0000000001100031000000010200008a0000009603000041000000000221004b000000000200001900000000020320190000009601100197000000960410009c00000000030080190000009601100167000000960110009c00000000010200190000000001036019000000000110004c000000ee0000c13d00000000010000190000025100010430000000000100001900000251000104300000000001000019024f024d0000040f0000004002000039000000000202043300000000001204350000004001200210000000a101100197000000a2011001c7000002500001042e0000001f02200039000000200300008a000000000232016f0000000001120019000000000221004b00000000020000190000000102004039000000a30310009c000001060000213d000000010220018f000000000220004c000001060000c13d00000040020000390000000000120435000000000001042d000000980100004100000000001004350000004101000039000000040200003900000000001204350000009901000041000002510001043000000040041000390000006005000039000000000054043500000020041000390000000000340435000000000021043500000080020000390000000002020433000000600310003900000000002304350000008001100039000000000320004c000001220000613d00000000030000190000000004310019000000a005300039000000000505043300000000005404350000002003300039000000000423004b0000011b0000413d000000000321001900000000000304350000001f02200039000000200300008a000000000232016f0000000001210019000000000001042d000000000423004900000096050000410000003f0640008c000000000600001900000000060520190000009604400197000000000740004c0000000005008019000000960440009c00000000040600190000000004056019000000000440004c000001760000613d00000000040204330000009e0540009c000001780000813d000000200510011a000000000504001f00000020042000390000000004040433000000a40540009c0000017a0000813d00000000022400190000001f042000390000009605000041000000000634004b0000000006000019000000000605401900000096044001970000009607300197000000000874004b000000000500a019000000000474013f000000960440009c00000000040600190000000004056019000000000440004c0000017c0000613d0000000004020433000000a40540009c0000017e0000813d0000003f05400039000000200600008a000000000765016f000000400600003900000000050604330000000007750019000000000857004b00000000080000190000000108004039000000a30970009c000001850000213d000000010880018f000000000880004c000001850000c13d0000000000760435000000000045043500000000064200190000002006600039000000000336004b0000018c0000213d000000000340004c000001700000613d000000000300001900000020033000390000000006530019000000000723001900000000070704330000000000760435000000000643004b000001690000413d000000000254001900000020022000390000000000020435000000200210011a000100000205001f000000000001042d0000000001000019000002510001043000000000010000190000025100010430000000000100001900000251000104300000000001000019000002510001043000000098010000410000000000100435000000410100003900000004020000390000000000120435000000990100004100000251000104300000009801000041000000000010043500000041010000390000000402000039000000000012043500000099010000410000025100010430000000000100001900000251000104300002000000000002000000c4011002100000004003200210000000a503300041000000000131019f00000000020204330000006002200210000000a602200197000000000121019f000000a7011001c700008006020000390000000005000415000000020550008a00000020055000c900000000030000190000000004000019024f02320000040f000000020100035f000200000001035500000060021002700000009502200197000000ff03000039000000010330024f000000000330004c000001f60000613d0000003f01200039000000a804100197000000400300003900000000010304330000000005410019000000000615004b00000000060000190000000106004039000000a30750009c000002120000213d000000010660018f000000000660004c000002120000c13d000000000053043500000000002104350000002003100039000000200640008a0000001f0460018f000000010500036700000000055003680000000506600270000000000760004c000001c70000613d000000000700001900000005087002100000000009830019000000000885034f000000000808043b00000000008904350000000107700039000000000867004b000001bf0000413d000000000740004c000001d60000613d0000000506600210000000000565034f00000000066300190000000304400210000000000706043300000000074701cf000000000747022f000000000505043b0000010004400089000000000545022f00000000044501cf000000000474019f000000000046043500000000002104350000001f0420018f00000002050003670000000502200270000000000620004c000001e50000613d000000000600001900000005076002100000000008730019000000000775034f000000000707043b00000000007804350000000106600039000000000726004b000001dd0000413d000000000640004c000001f40000613d0000000502200210000000000525034f00000000022300190000000303400210000000000402043300000000043401cf000000000434022f000000000505043b0000010003300089000000000535022f00000000033501cf000000000343019f00000000003204350000000200000005000000000001042d0000001f0420018f0000000503200270000000000530004c000002020000613d00000000050000190000000506500210000000000761034f000000000707043b00000000007604350000000105500039000000000635004b000001fb0000413d000000000540004c000002100000613d00000003044002100000000503300210000000000503043300000000054501cf000000000545022f000000000131034f000000000101043b0000010004400089000000000141022f00000000014101cf000000000151019f00000000001304350000006001200210000002510001043000000098010000410000000000100435000000410100003900000004020000390000000000120435000000990100004100000251000104300002000000000002000200000003001d0000002003300039000100000003001d00000228002104230000000203000029000000200230011a000000000201035500000096010000410000000102000029000000200220011a00000000021201bd00000000010300190000000200000005000000000001042d0000000203000029000000200230011a0000000002010355000000a9010000410000000102000029000000200220011a000000000212018d00000000010300190000000200000005000000000001042d0002000000000002000200000005001d0000002005500039000100000005001d00000241002104210000000203000029000000200230011a000000000201035500000096010000410000000102000029000000200220011a00000000021201bd00000000010300190000000200000005000000000001042d0000000203000029000000200230011a0000000002010355000000a9010000410000000102000029000000200220011a000000000212018d00000000010300190000000200000005000000000001042d000000000012041b000000000001042d000000000101041a000000000001042d0000024f00000432000002500001042e00000251000104300000000000000001000000000000000100000000000000000000000000000000000000000000000000000000ffffffff800000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000400000010000000000000000004e487b710000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000240000000000000000000000001806aa1896bbf26568e884a7374b41e002500962caba6a15023a8d90e8508b83020002000000000000000000000000000000002400000000000000000000000000000000000000000000000000000000000000000000000000000000ab0c45a800000000000000000000000000000000000000000000000000000000c795c91300000000000000000000000100000000000000000000000000000000000000002ff7479a00000000000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000ffffffff00000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffff000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000ffffff000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001ffffffe07fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000000";

type WFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: WFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class WFactory__factory extends ContractFactory {
  constructor(...args: WFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _wBytecodeHash: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<WFactory> {
    return super.deploy(_wBytecodeHash, overrides || {}) as Promise<WFactory>;
  }
  override getDeployTransaction(
    _wBytecodeHash: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_wBytecodeHash, overrides || {});
  }
  override attach(address: string): WFactory {
    return super.attach(address) as WFactory;
  }
  override connect(signer: Signer): WFactory__factory {
    return super.connect(signer) as WFactory__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WFactoryInterface {
    return new utils.Interface(_abi) as WFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): WFactory {
    return new Contract(address, _abi, signerOrProvider) as WFactory;
  }
}
