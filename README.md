# Testamint - Social Recovery
## ETH Lisbon Hackathon project

This is a Hardhat project, with Solidity smart-contracts used for the zkSync network.

----

There are two smart-contracts: **Wallnut**, which uses account abstraction to allow for multisig (if the set time has passed), and **WFactory**, the Wallnut factory.

The owner of the Wallnut decides the time that needs to pass to allow for multisig (in days), upon contract creation, and can add or remove addresses to the member list of the multisig.

Everytime the owner uses the contract, it'll save the current timestamp to make sure the members won't use the multisig while the owner is active.

If the set time has passed since the last owner activity, the contract transactions can be used by the members using multisig. If any of the members' addresses are a Wallnut, only those who are active are needed for the signature.
