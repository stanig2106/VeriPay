// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ByteHasher} from './helpers/ByteHasher.sol';
import {IWorldID} from './interfaces/IWorldID.sol';

contract VeriPayContract {
    ///////////////////////////////////////////////////////////////////////////////
    ///                                 World ID                                ///
    //////////////////////////////////////////////////////////////////////////////

    using ByteHasher for bytes;

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

    /// @dev Mapping of user addresses to the timestamp of their World ID verification
    mapping(address => uint256) internal userVerificationTimestamps;

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
        userVerificationTimestamps[signal] = block.timestamp;

        emit Verified(signal, nullifierHash);
    }

    /// @param user The address of the user to check verification status
    /// @return bool indicating whether the user has been verified
    function isUserVerified(address user) public view returns (bool) {
        return userWorldIDTokens[user] != 0;
    }

    /// @param user The address of the user to check the verification timestamp
    /// @return uint256 indicating the timestamp of the user's verification
    function getVerificationTimestamp(address user) public view returns (uint256) {
        return userVerificationTimestamps[user];
    }

    ///////////////////////////////////////////////////////////////////////////////
    ///                          VeriPay product                                ///
    //////////////////////////////////////////////////////////////////////////////

    /// @notice Thrown when an unauthorized action is attempted on a product
    error UnauthorizedAction();

    /// @dev The product struct
    struct Product {
        address seller;
        address buyer;
        uint256 price;
        bool sellerValidation;
        bool buyerValidation;
        uint256 timestamp;
    }

    /// @dev The product ID to product mapping
    mapping(string => Product) internal products;

    /// @dev This method is called by the buyer to create the product and pay the seller
    /// @param productId The product ID (a string)
    /// @param price The price of the product
    function createProduct(string memory productId, uint256 price, address seller) public payable {
        if (msg.value != price) revert UnauthorizedAction();

        products[productId] = Product({
            seller: seller,
            buyer: msg.sender,
            price: price,
            sellerValidation: false,
            buyerValidation: false,
            timestamp: block.timestamp
        });
    }

    /// @dev This method is called by the seller to validate the product,
    ///      ensuring the buyer has paid the correct amount for the product
    /// @param productId The product ID
    function sellerValidate(string memory productId) public {
        if (products[productId].seller != msg.sender) revert UnauthorizedAction();
        if (products[productId].sellerValidation) revert UnauthorizedAction();

        products[productId].sellerValidation = true;
    }

    /// @dev This method is called by the buyer to validate the product,
    ///      ensuring the seller has correctly sent the product
    /// @param productId The product ID
    function buyerValidate(string memory productId) public {
        if (products[productId].buyer != msg.sender) revert UnauthorizedAction();
        if (!products[productId].sellerValidation) revert UnauthorizedAction();
        if (products[productId].buyerValidation) revert UnauthorizedAction();

        products[productId].buyerValidation = true;
    }

    /// @dev This method is called by the buyer to cancel the product
    ///      if the seller has not validated the product for a long time
    /// @param productId The product ID
    function buyerCancel(string memory productId) public {
        if (products[productId].buyer != msg.sender) revert UnauthorizedAction();
        if (products[productId].sellerValidation) revert UnauthorizedAction();
        if (products[productId].buyerValidation) revert UnauthorizedAction();

        payable(msg.sender).transfer(products[productId].price);
        delete products[productId];
    }

    /// @dev This method is called by the seller to claim the payment
    ///      if the buyer has validated the product
    /// @param productId The product ID
    function sellerClaim(string memory productId) public {
        if (products[productId].seller != msg.sender) revert UnauthorizedAction();
        if (!products[productId].sellerValidation) revert UnauthorizedAction();
        if (!products[productId].buyerValidation) revert UnauthorizedAction();

        payable(msg.sender).transfer(products[productId].price);
        delete products[productId];
    }

    /// @dev Check timestamp != 0 to see if the product exists
    /// @param productId The product ID
    function getProductId(string memory productId) public view returns (Product memory) {
        return products[productId];
    }

    /// @todo implement a system of arbitration with oracles, that can be paid
    ///    by the buyer or the seller depending on the result of the arbitration
}
