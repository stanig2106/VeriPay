// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ByteHasher} from './helpers/ByteHasher.sol';
import {IWorldID} from './interfaces/IWorldID.sol';

contract VeriPayContract {
    using ByteHasher for bytes;

    ///////////////////////////////////////////////////////////////////////////////
    ///                                  ERRORS                                ///
    //////////////////////////////////////////////////////////////////////////////

    /// @notice Thrown when attempting to reuse a nullifier
    error DuplicateNullifier(uint256 nullifierHash);

    /// @notice Thrown when an address tries to verify with an already used World ID token
    error DuplicateWorldIDToken(address user);

    /// @dev The World ID instance that will be used for verifying proofs
    IWorldID internal immutable worldId;

    /// @dev The contract's external nullifier hash
    uint256 internal immutable externalNullifier;

    /// @dev The World ID group ID (always 1)
    uint256 internal immutable groupId = 1;

    /// @dev Whether a nullifier hash has been used already. Used to guarantee an action is only performed once by a single person
    mapping(uint256 => bool) internal nullifierHashes;

    /// @dev Mapping of user addresses to their World ID tokens
    mapping(address => uint256) internal userWorldIDTokens;

    /// @param nullifierHash The nullifier hash for the verified proof
    /// @dev A placeholder event that is emitted when a user successfully verifies with World ID
    event Verified(address user, uint256 nullifierHash);

    /// @param _worldId The WorldID router that will verify the proofs
    /// @param _appId The World ID app ID
    /// @param _actionId The World ID action ID
    constructor(IWorldID _worldId, string memory _appId, string memory _actionId) {
        worldId = _worldId;
        externalNullifier = abi.encodePacked(abi.encodePacked(_appId).hashToField(), _actionId).hashToField();
    }

    /// @param signal An arbitrary input from the user, usually the user's wallet address (check README for further details)
    /// @param root The root of the Merkle tree (returned by the JS widget).
    /// @param nullifierHash The nullifier hash for this proof, preventing double signaling (returned by the JS widget).
    /// @param proof The zero-knowledge proof that demonstrates the claimer is registered with World ID (returned by the JS widget).
    /// @dev Feel free to rename this method however you want! We've used `claim`, `verify` or `execute` in the past.
    function verifyId(address signal, uint256 root, uint256 nullifierHash, uint256[8] calldata proof) public {
        if (nullifierHashes[nullifierHash]) revert DuplicateNullifier(nullifierHash);
        if (userWorldIDTokens[signal] != 0) revert DuplicateWorldIDToken(signal);

        worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(signal).hashToField(),
            nullifierHash,
            externalNullifier,
            proof
        );

        nullifierHashes[nullifierHash] = true;
        userWorldIDTokens[signal] = nullifierHash;

        emit Verified(signal, nullifierHash);
    }

    /// @param user The address of the user to check verification status
    /// @return bool indicating whether the user has been verified
    function isUserVerified(address user) public view returns (bool) {
        return userWorldIDTokens[user] != 0;
    }
}
