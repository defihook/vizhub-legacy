export const sendEvent = (eventIDs) => {
  // console.log('sendEvent: ', eventIDs);
  fetch('/api/event/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventIDs }),
  });
};
