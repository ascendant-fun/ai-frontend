import type {NextApiRequest, NextApiResponse} from "next";
import {ethers} from "ethers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {ens} = req.body;

  if (!ens) {
    return res.status(403).json({message: "No ens provided"});
  }

  if (typeof ens !== "string") {
    return res.status(403).json({message: "Incorrect data type"});
  }

  const address = await getAddress(ens);

  res.status(200).json({address});
}

async function getAddress(ens: string) {
  try {
    const provider = ethers.getDefaultProvider(
      "homestead", // mainnet
      {
        alchemy: "pwm9G7MI7C1GQLYgRpG4Ioo6Mlqvaqmp",
      }
    );

    const address = await provider.resolveName(ens);

    return address;
  } catch (err) {
    // silent catch

    return null;
  }
}
