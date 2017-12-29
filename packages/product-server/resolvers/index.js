

export default {
  Query: {
    helloWorld: (root, { name }, context) => {
      return {
        message: `Hello ${name}`,
      };
    },
    designs: () => {

    }
  },
}
