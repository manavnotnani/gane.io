export const getTokensAirstack = `query MyQuery($walletAddress: [Identity!], $chain: TokenBlockchain!) {
  TokenBalances(
    input: {filter: {owner: {_in: $walletAddress}}, blockchain: $chain, limit: 200}
  ) {
    TokenBalance {
      tokenNfts {
        erc6551Accounts {
          address {
            addresses
          }
          standard
        }
        metaData {
          description
          image
          attributes {
            trait_type
            value
          }
          name
        }
      }
      tokenId
    }
  }
}`;
