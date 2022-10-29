// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@matterlabs/zksync-contracts/l2/system-contracts/interfaces/IAccount.sol";
import "@matterlabs/zksync-contracts/l2/system-contracts/TransactionHelper.sol";

import "@openzeppelin/contracts/interfaces/IERC1271.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

// Used for signature validation
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

// Access zkSync system contracts, in this case for nonce validation vs NONCE_HOLDER_SYSTEM_CONTRACT
import "@matterlabs/zksync-contracts/l2/system-contracts/Constants.sol";
// to call non-view method of system contracts
import "@matterlabs/zksync-contracts/l2/system-contracts/SystemContractsCaller.sol";

interface IWallnut {

    function isActive() external view returns (bool);
}

contract Wallnut is IAccount, IWallnut, ERC165, IERC1271 {
    // to get transaction hash
    using TransactionHelper for Transaction;

    struct Member {
        bool active;
        string name;
        string pfp;
    }

    // Account info
    address public owner;
    uint256 public lastTimestamp;
    uint public daysThreshold;
    uint public familyLength;
    mapping(uint => address) public familyAddr;
    mapping(address => Member) public family;

    bytes4 constant EIP1271_SUCCESS_RETURN_VALUE = 0x1626ba7e;

    modifier onlyBootloader() {
        require (msg.sender == BOOTLOADER_FORMAL_ADDRESS, "Only bootloader can call this method");
        // Continure execution if called from the bootloader.
        _;
    }

    modifier onlyOwner() {
        require (msg.sender == owner);
        _;
    }

    constructor(address _owner, uint _daysThreshold) {
        familyLength = 0;
        owner = _owner;
        lastTimestamp = block.timestamp;
        daysThreshold = _daysThreshold;
    }


    function addMember(address _member, string memory _name, string memory _pfp) external onlyOwner {
        require(family[_member].active != true, "Cannot add already existing member");

        familyAddr[familyLength++] = _member;
        family[_member] = Member(true, _name, _pfp);

        stillHere();
    }

    function removeMember(address _member) external onlyOwner {
        require(family[_member].active == true, "Can only remove active members");

        family[_member].active = false;

        bool removed = false;
        for (uint i = 0; i < familyLength; i++) {
            if (familyAddr[i] == _member) {
                familyAddr[i] = address(0);
                removed = true;
                continue;
            } else if (removed) {
                familyAddr[i-1] = familyAddr[i];
                familyAddr[i] = address(0);
            }
        }

        familyLength--;

        stillHere();
    }

    function transfer(address _to, uint256 _amount ) external {
        (bool sent, ) = _to.call{value: _amount}("");
    }

    function stillHere() public onlyOwner {
        lastTimestamp = block.timestamp;
    }

    function isActive() external view returns (bool) {
        return _verifyNutCrack() == EIP1271_SUCCESS_RETURN_VALUE;
    }

    function _verifyNutCrack() internal view returns (bytes4) {
        if (block.timestamp >= lastTimestamp + daysThreshold * 1 days ) {
            return 0x0;
        }

        return EIP1271_SUCCESS_RETURN_VALUE;
    }

    function validateTransaction(
        bytes32,
        bytes32,
        Transaction calldata _transaction
    ) external payable override onlyBootloader {
        _validateTransaction(_transaction);
    }

    function _validateTransaction(
        Transaction calldata _transaction
    ) internal {
        // Incrementing the nonce of the account.
        // Note, that reserved[0] by convention is currently equal to the nonce passed in the transaction
        SystemContractsCaller.systemCall(
            uint32(gasleft()),
            address(NONCE_HOLDER_SYSTEM_CONTRACT),
            0,
            abi.encodeCall(
                INonceHolder.incrementMinNonceIfEquals,
                (_transaction.reserved[0])
            )
        );
    }

    function executeTransaction(
        bytes32,
        bytes32,
        Transaction calldata _transaction
    ) external payable override onlyBootloader {
        _executeTransaction(_transaction);
    }

    function _executeTransaction(Transaction calldata _transaction) internal {
        address to = address(uint160(_transaction.to));
        uint256 value = _transaction.reserved[1];
        bytes memory data = _transaction.data;

        bytes32 txHash = _transaction.encodeHash();

        require(
            isValidSignature(txHash, _transaction.signature) ==
                EIP1271_SUCCESS_RETURN_VALUE
        );

        if (to == address(DEPLOYER_SYSTEM_CONTRACT)) {
            // We allow calling ContractDeployer with any calldata
            SystemContractsCaller.systemCall(
                uint32(gasleft()),
                to,
                uint128(_transaction.reserved[1]), // By convention, reserved[1] is `value`
                _transaction.data
            );
        } else {
            bool success;
            assembly {
                success := call(
                    gas(),
                    to,
                    value,
                    add(data, 0x20),
                    mload(data),
                    0,
                    0
                )
            }
            require(success);
        }
    }

    function executeTransactionFromOutside(Transaction calldata _transaction)
        external
        payable
    {
        _validateTransaction(_transaction);

        _executeTransaction(_transaction);
    }

    function isValidSignature(bytes32 _hash, bytes calldata _signature)
        public
        view
        override
        returns (bytes4)
    {
        // Each ECDSA signature is 65 bytes long.
        if (_verifyNutCrack() == EIP1271_SUCCESS_RETURN_VALUE) {
            require(_signature.length % 65 == 0, "Signature length is incorrect");

            uint signatureCount = _signature.length / 65;
            require(signatureCount <= familyLength, "Incorrect number of signatures");

            address[] memory membersSigned = new address[](signatureCount);
            for (uint i = 0; i < signatureCount; i++) {
                membersSigned[i] = ECDSA.recover(_hash, _signature[i * 65 : (i+1) * 65]);
            }

            uint familyChecked = 0;
            for (uint i = 0; i < familyLength; i++) {
                // TODO: verify if address is wallnut wallet AND is active
                if (ERC165(familyAddr[i]).supportsInterface(type(IWallnut).interfaceId)) {
                    if (!IWallnut(familyAddr[i]).isActive()) {
                        familyChecked++;
                        continue;
                    }
                }

                for (uint j = 0; j < signatureCount; j++) {
                    if (membersSigned[j] == familyAddr[i]) {
                        familyChecked++;
                        break;
                    }
                }
            }

            require(familyChecked == familyLength, "Not all active family members signed");
        } else {
            require(_signature.length == 65, "Signature length is incorrect");
            address recoveredAddr = ECDSA.recover(_hash, _signature[0:65]);
            require(recoveredAddr == owner);
        }

        return EIP1271_SUCCESS_RETURN_VALUE;
    }

    function payForTransaction(
        bytes32,
        bytes32,
        Transaction calldata _transaction
    ) external payable override onlyBootloader {
        bool success = _transaction.payToTheBootloader();
        require(success, "Failed to pay the fee to the operator");
    }

    function prePaymaster(
        bytes32,
        bytes32,
        Transaction calldata _transaction
    ) external payable override onlyBootloader {
        _transaction.processPaymasterInput();
    }

    receive() external payable {
        // If the bootloader called the `receive` function, it likely means
        // that something went wrong and the transaction should be aborted. The bootloader should
        // only interact through the `validateTransaction`/`executeTransaction` methods.
        assert(msg.sender != BOOTLOADER_FORMAL_ADDRESS);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165) returns (bool) {
        return interfaceId == type(IWallnut).interfaceId || super.supportsInterface(interfaceId);
    }
}
