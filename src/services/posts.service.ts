import { makeGetCall } from "./api.service";

const getImages = async ({ page, limit }: any) => {
  try {
    const res = await makeGetCall({
      path: `/list?page=${page}&limit=${limit}`,
    });
    return res;
  } catch (err) {}
};

export { getImages };
