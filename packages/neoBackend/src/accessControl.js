//const get = require('lodash/get')
//const { isIncrementViewCount } = require('../db/accessors')

export const accessControl = (shareDB) => {

  // This middleware applies access control rules to all ops (changes).
  shareDB.use('apply', (request, done) => {

    // Unpack the ShareDB request object.
    const {
      collection,
      op,
      agent: {
        isServer,
        userId
      },
      snapshot
    } = request;

    console.log('inside second middleware, owner ID is ' + request.owner);
    console.log({isServer, userId});


    //if(op.create){
    //  console.log(JSON.stringify(op, null, 2));
    //}

    //// Get the owner id.
    //const { owner } =
    //  op.create
    //    ? (op.create.data || {}) // Handle the case of a creation op.
    //    : snapshot.data // Handle ops on an existing document.

    //// Get the collaborators.
    //const collaborators = get(snapshot, 'data.collaborators')

    //// Access control rules:

    //// Allow server code to do anything (e.g. create and update User entries).
    //if (isServer) {
    //  return done()
    //}

    //// Anyone can increment a view count.
    //if (isIncrementViewCount(op)) {
    //  return done()
    //}

    //// For all ops, owner must be the logged in user.
    //if (!userId) {
    //  return done('You must be logged in to edit.')
    //}

    //// Check that the user is either the owner or a collaborator.
    //if (owner !== userId) {
    //  const ids = (collaborators || []).map(({id}) => id)
    //  const isCollaborator = ids.filter(id => id === userId).length
    //  if (!isCollaborator) {
    //    return done('You must be the owner of this document or a collaborator in order to edit it.')
    //  }
    //}

    done();
  });
};
