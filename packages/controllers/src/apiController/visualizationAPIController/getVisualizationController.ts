import { GetVisualization } from 'datavis-tech-use-cases';

export const getVisualizationController = (expressApp, gateways) => {
  const getVisualization = new GetVisualization(gateways);
  expressApp.get('/api/visualization/get/:id', async (req, res) => {
    try {
      const requestModel = { id: req.params.id };
      const responseModel = await getVisualization.execute(requestModel);
      res.json(responseModel);
    } catch (error) {
      res.json({ error })
    }
  });
}
