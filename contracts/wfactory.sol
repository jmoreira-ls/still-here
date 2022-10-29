// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@matterlabs/zksync-contracts/l2/system-contracts/Constants.sol';
import '@matterlabs/zksync-contracts/l2/system-contracts/SystemContractsCaller.sol';

contract WFactory {
    bytes32 public aaBytecodeHash;

    constructor(bytes32 _wBytecodeHash) {
        aaBytecodeHash = _wBytecodeHash;
    }

    function deployAccount(
        bytes32 salt,
        address owner,
        uint thresholdDays
    ) external returns (address accountAddress) {
        bytes memory returnData = SystemContractsCaller.systemCall(
            uint32(gasleft()),
            address(DEPLOYER_SYSTEM_CONTRACT),
            0,
            abi.encodeCall(
                DEPLOYER_SYSTEM_CONTRACT.create2Account,
                (salt, aaBytecodeHash, abi.encode(owner, thresholdDays))
            )
        );

        (accountAddress, ) = abi.decode(returnData, (address, bytes));
    }
}
