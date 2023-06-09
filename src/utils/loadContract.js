import { ethers } from "ethers";
import { stakingICOAddress, stakingICOAbi } from "./constants";
import { toast } from "react-toastify";

async function loadContract(signer, chainId, setContract, address) {
  if (chainId !== 31337) {
    toast.error(
      "Please Change your network to BNB Testnet Network for Buying Tokens"
    );
    return;
  }
  const _stknICOContract = new ethers.Contract(
    stakingICOAddress,
    stakingICOAbi,
    signer
  );

  setContract({
    stknICO: _stknICOContract,
  });

  //Read From Contract

  const tokensAvailable = ethers.utils.formatEther(
    await _stknICOContract.getICOTokenBalance()
  );

  const investorBalance = ethers.utils.formatEther(
    await _stknICOContract.investorBalanceOf(address)
  );

  return {
    tokensAvailable,
    investorBalance,
  };
}

export default loadContract;
