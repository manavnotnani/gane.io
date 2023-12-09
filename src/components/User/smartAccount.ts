// import { createPublicClient, http } from 'viem'
// import { createSmartAccountClient, createBundlerClient } from 'permissionless'
// import { createPimlicoPaymasterClient } from "permissionless/clients/pimlico";
// import { privateKeyToSafeSmartAccount,  } from 'permissionless/accounts'

// export const publicClient = createPublicClient({
// 	transport: http("https://CHAIN.infura.io/v3/API_KEY"),
// });

// export const bundlerClient= createBundlerClient({
// 	transport: http(
// 		"https://api.pimlico.io/v1/CHAIN/rpc?apikey=API_KEY",
// 	),
// })
 
// export const paymasterClient = createPimlicoPaymasterClient({
// 	transport: http(
// 		"https://api.pimlico.io/v2/CHAIN/rpc?apikey=API_KEY",
// 	),
// });

// const safeAccount = await privateKeyToSafeSmartAccount(publicClient, {
// 	privateKey: "0xPRIVATE_KEY",
// 	safeVersion: "1.4.1",
// 	entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789", // global entrypoint
// 	saltNonce: 0n, // optional,
// 	safeModules: [",.,,,"]
// });

// const smartAccountClient = createSmartAccountClient({
// 	account: safeAccount,
// 	chain: sepolia,
// 	transport: http(
// 		"https://api.pimlico.io/v1/CHAIN/rpc?apikey=API_KEY",
// 	),
// 	sponsorUserOperation: async ({userOperation, entryPoint}) => {
// 		return {
// 			paymasterAndData: "",
// 			callGasLimit: "",
// 			verificationGasLimit: "",
// 			preVerificationGas: ""
// 		}
// 	}, // optional base paymaster code 
// });

// const userOp = smartAccountClient.prepareUserOperationRequest({
// 	callData: '... actual call data for module'
// })

// bundlerClient.sendUserOperation(userOp)