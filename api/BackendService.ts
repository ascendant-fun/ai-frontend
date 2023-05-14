import axios from "axios";

type GetEnsFromAddressResponse = {
  ens: string | null;
};

type GetAddressFromEnsResponse = {
  address: string | null;
};

async function getEnsFromAddress(address: string) {
  try {
    const response = await axios.get<GetEnsFromAddressResponse>(
      "/api/getEnsFromAddress/" + address
    );

    if (response.status === 200) {
      return response.data?.ens ?? null;
    }
  } catch (err) {
    return null;
  }

  return null;
}

async function getAddressFromEns(ens: string) {
  try {
    const response = await axios.post<GetAddressFromEnsResponse>(
      "/api/getAddressFromEns",
      {
        ens,
      }
    );

    if (response.status === 200) {
      return response.data?.address ?? null;
    }
  } catch (err) {
    return null;
  }

  return null;
}

export {getEnsFromAddress, getAddressFromEns};
