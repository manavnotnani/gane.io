// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Marketplace {
    uint public orderID;

    struct Order {
        address owner;
        address tokenContract;
        uint tokenID;
        uint price;
    }

    mapping(uint => bool) public isExecuted;
    mapping(uint => Order) public orderDetail;

    event OrderListed(uint indexed OrderId, address TokenContract, uint TokenId, uint Price);
    event OrderCompleted(uint indexed orderId, address to, address TokenContract, uint TokenId, uint Price);

    function listNFT(Order calldata _order) public {
        require(_order.owner == IERC721(_order.tokenContract).ownerOf(_order.tokenID) && _order.owner == msg.sender, "Not owner");
        orderID++;
        orderDetail[orderID] = _order;
        emit OrderListed(orderID, _order.tokenContract, _order.tokenID, _order.price);
    }

    function buy(uint _orderID, address to) public payable {
        Order memory _order = orderDetail[_orderID];
        require(!isExecuted[_orderID], "Already sold");
        require(msg.value >= _order.price, "insufficient amount");
        (bool sent, ) = to.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        IERC721(_order.tokenContract).transferFrom(_order.owner, to, _order.tokenID);
        isExecuted[_orderID] = true;
        emit OrderCompleted(_orderID, to, _order.tokenContract, _order.tokenID, msg.value);
    }
}