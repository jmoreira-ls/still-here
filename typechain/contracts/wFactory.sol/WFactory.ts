/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface WFactoryInterface extends utils.Interface {
  functions: {
    "aaBytecodeHash()": FunctionFragment;
    "deployAccount(bytes32,address,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "aaBytecodeHash" | "deployAccount"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "aaBytecodeHash",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "deployAccount",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "aaBytecodeHash",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "deployAccount",
    data: BytesLike
  ): Result;

  events: {};
}

export interface WFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: WFactoryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    aaBytecodeHash(overrides?: CallOverrides): Promise<[string]>;

    deployAccount(
      salt: PromiseOrValue<BytesLike>,
      owner: PromiseOrValue<string>,
      thresholdDays: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  aaBytecodeHash(overrides?: CallOverrides): Promise<string>;

  deployAccount(
    salt: PromiseOrValue<BytesLike>,
    owner: PromiseOrValue<string>,
    thresholdDays: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    aaBytecodeHash(overrides?: CallOverrides): Promise<string>;

    deployAccount(
      salt: PromiseOrValue<BytesLike>,
      owner: PromiseOrValue<string>,
      thresholdDays: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {};

  estimateGas: {
    aaBytecodeHash(overrides?: CallOverrides): Promise<BigNumber>;

    deployAccount(
      salt: PromiseOrValue<BytesLike>,
      owner: PromiseOrValue<string>,
      thresholdDays: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    aaBytecodeHash(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    deployAccount(
      salt: PromiseOrValue<BytesLike>,
      owner: PromiseOrValue<string>,
      thresholdDays: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
