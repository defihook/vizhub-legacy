import { GetHomePageData } from 'vizhub-use-cases';

export const getHomePageDataController = (expressApp, gateways) => {
  const getHomePageData = new GetHomePageData(gateways);
  expressApp.get('/api/visualization/home', async (req, res) => {
    const { offset } = req.query;
    try {
      const homePageData = await getHomePageData.execute(offset);
      res.json(homePageData);
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  });
};
