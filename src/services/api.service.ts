import Constants from "../lib/const";
interface ReqData {
  path: string
}

const makeGetCall = async (data: ReqData) => {
  try {
    const { path } = data;
    const response = await fetch(`${Constants.API}${path}`);
    if (response.status === Constants.resCodes.success)
      return await response.json();
    else throw response;
  } catch (err) {
    throw err;
  }
};

export { makeGetCall };
