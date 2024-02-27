import axios from 'axios';

axios.defaults.baseURL = 'https://test.vmarmysh.com';

export const getTree = async (value) => {
  const queryParams = new URLSearchParams({
      // id: 0,
      treeName: value,
      // children: [
      //   null
      // ]

  });

  try {
    const response = await axios.post(`/api.user.tree.get?${queryParams}`)
    return response.data
  } catch (err) {
    console.error(err.toJSON())
  }
};

// export const addTreeNode = async (value) => {
//   const queryParams = new URLSearchParams({
//       id: 0,
//       name: value,
//       children: [
//         null
//       ]

//   });
//   const response = await axios.post(`/api.user.tree.get?${queryParams}`);
//   return response.data;
// };

