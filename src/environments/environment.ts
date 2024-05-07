export const domainBase = {
  rest: 'https://jsonplaceholder.typicode.com',
};

export const environment = {
  endpoints: {
    posts: `${domainBase.rest}/posts`,
    albums: `${domainBase.rest}/albums`,
    photos: `${domainBase.rest}/photos`,
    users: `${domainBase.rest}/users`,
  },
};
