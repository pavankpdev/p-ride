export const AllowedChain = [{
    id: '0x13881'
}]

export const isConnectedToAllowedChain = (chainId) => {
    return AllowedChain.some(chain => chain.id === chainId)
}