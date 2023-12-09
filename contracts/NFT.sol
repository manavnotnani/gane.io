// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interface/IERC6551Registry.sol";

contract NFT is ERC721, ERC721URIStorage, Ownable {
    uint256 private _tokenId;
    IERC6551Registry public registry;

    constructor(IERC6551Registry _registry) ERC721("TestNFT", "TNFT") {
        registry = _registry;
    }

    function totalSupply() public view returns (uint256) {
        return _tokenId;
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function safeMint(address to, string memory uri) public {
        _tokenId++;
        _safeMint(to, _tokenId);
        _setTokenURI(_tokenId, uri);
    }

    function create6551Account(
        address to,
        string memory uri,
        address implementation,  
        bytes calldata initData) public returns(address) {
            safeMint(to,uri);
            return registry.createAccount(implementation, getChainID(), address(this) , _tokenId, _tokenId, initData);
        }

    function getChainID() public view returns (uint256) {
        uint256 id;
        assembly {
            id := chainid()
        }
        return id;
    }
}
