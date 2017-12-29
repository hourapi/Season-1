import { range, reduce, size } from "lodash";
const faker = require("faker");

function createTypes(factory, number = 10) {
  const rangeItems = range(number);

  return rangeItems.map(() => {
    return factory();
  });
}

function design() {
  const likes = createTypes(like);

  const likeCount = reduce(
    likes,
    (memo, currentVal) => {
      return currentVal.vote + memo;
    },
    0
  );

  return {
    designer: designer(),
    id: faker.random.uuid(),
    url: faker.image.imageUrl(),
    createdAt: faker.date.recent(),
    likes,
    likeCount,
    totalLikes: size(likes)
  };
}

function designer() {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  return {
    id: faker.random.uuid(),
    name: `${firstName} ${lastName}`,
    firstName,
    lastName,
    avatar: faker.image.avatar()
  };
}

function like() {
  return {
    customerId: faker.random.uuid(),
    vote: faker.random.boolean() ? 1 : -1
  };
}

export default {
  Query: () => {
    return {
      designs: (root, {}, context) => {
        return createTypes(design);
      }
    };
  }
};
