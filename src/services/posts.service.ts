import { makeGetCall } from "./api.service";

interface ReqData {
  page: number;
  limit: number
}
const getImages = async ({ page, limit }: ReqData) => {
  try {
    const res = await makeGetCall({
      path: `/list?page=${page}&limit=${limit}`,
    });
    return res;
  } catch (err) {}
};

export { getImages };
