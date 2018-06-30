import { computeReferences } from './computeReferences';

export const Presenter = gateway => ({
  presentVisualization: id => (
    gateway.fetchDocument(id).then(async visualization => {
      const references = await computeReferences(visualization.files);
      return Promise
        .all([
          Promise.all(references.map(gateway.fetchDocument)),
          gateway.fetchUser(visualization.owner)
        ])
        .then((referencedDocuments, owner) => ({
          visualization,
          references,
          referencedDocuments,
          owner
        }));
    })
  )
});
