// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract BatchMint is ERC1155, Ownable {
    constructor(string memory uri) ERC1155(uri) Ownable(msg.sender) {}

    uint ticketPrice = 0.00001 ether;
    uint256 id = 1;
    event NftMinted(address[] to, uint tokenId, uint value);
    event Transfered(address from, address to, uint id);

    // `value` amount of tokens
    function mintTickets(address[] memory to, uint256 value) public payable {
        require(value > 0, "Value can't be zero");
        uint totalCost = ticketPrice * to.length * value;
        require(msg.value > totalCost, "Insufficient balance");
        for (uint i = 0; i < to.length; i++) {
            require(to[i] != address(0), "Invalid Address");

            _mint(to[i], id, value, "");

            emit NftMinted(to, id, value);
        }
    }

    function transfer(
        address from,
        address to,
        uint256 value,
        bytes memory data
    ) external {
        require(to != address(0), "invalid receiver");
        require(value > 0, "Invalid amount of tokens");
        _safeTransferFrom(from, to, id, value, data);
        emit Transfered(from, to, id);
    }

    //  function safeTransferFrom(address from, address to, uint256 id, uint256 value, bytes memory data) public virtual override{
    //      require(to != address(0), "invalid receiver");
    //      require(value >0,"Invalid amount of tokens");
    //       _safeTransferFrom(from, to, id, value, data);
    //       emit Transfered(from,to, id);
    // }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    // function setURI(string memory newuri) public onlyOwner {
    //     _setURI(newuri);
    // }
}

// random winner
// 10 tickets as voucher (image same) mint to different wallets and receive ether from wallets => select 1 winner
// offchain randomness => third party => winner
// winner address store on marketplace

// f1 voucher mint
// f2 select winner nft transfer(transferfrom )
