export const marketPlaceAbi: any = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
      { indexed: false, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "address",
        name: "TokenContract",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "TokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "Price",
        type: "uint256",
      },
    ],
    name: "OrderCompleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "OrderId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "TokenContract",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "TokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "Price",
        type: "uint256",
      },
    ],
    name: "OrderListed",
    type: "event",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_orderID", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
    ],
    name: "buy",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "isExecuted",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "address", name: "tokenContract", type: "address" },
          { internalType: "uint256", name: "tokenID", type: "uint256" },
          { internalType: "uint256", name: "price", type: "uint256" },
        ],
        internalType: "struct Marketplace.Order",
        name: "_order",
        type: "tuple",
      },
    ],
    name: "listNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "orderDetail",
    outputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "tokenContract", type: "address" },
      { internalType: "uint256", name: "tokenID", type: "uint256" },
      { internalType: "uint256", name: "price", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "orderID",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];
