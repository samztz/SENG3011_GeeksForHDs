import request from "../ultils/request"


export const getDefaultArticles = () => {
  const config = {
      url: 'articles',
      method: 'GET',
  }
  return request(config).then((res)=> res.data);
}

export const getArticlesByQuery = () => {
  const config = {
      url: 'articles',
      method: 'GET',
  }
  return request(config).then((res)=> res);
}
