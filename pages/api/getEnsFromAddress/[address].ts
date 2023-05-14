import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { address } = req.query;

  if (!address) {
    return res.status(403).json({ message: "No address provided" });
  }

  if (typeof address !== "string") {
    return res.status(403).json({ message: "Incorrect data type" });
  }

  const ens = await getEns(address);

  res.status(200).json({ ens });
}

async function getEns(address: string) {
  try {
    const provider = ethers.getDefaultProvider(
      "homestead", // mainnet
      {
        alchemy: "pwm9G7MI7C1GQLYgRpG4Ioo6Mlqvaqmp",
      }
    );

    const ens = await provider.lookupAddress(address);

    return ens;
  } catch (err) {
    // silent catch

    return null;
  }
}
