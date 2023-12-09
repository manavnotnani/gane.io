import { createPublicClient, http } from 'viem'

export const publicClient = createPublicClient({
	transport: http("https://CHAIN.infura.io/v3/API_KEY"),
});
 
export const paymasterClient = createPimlicoPaymasterClient({
	transport: http(
		"https://api.pimlico.io/v2/CHAIN/rpc?apikey=API_KEY",
	),
});

const safeAccount = await privateKeyToSafeSmartAccount(publicClient, {
	privateKey: "0xPRIVATE_KEY",
	safeVersion: "1.4.1",
	entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789", // global entrypoint
	saltNonce: 0n, // optional
});