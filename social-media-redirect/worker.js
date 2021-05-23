// Copyright 2021 scaredos
addEventListener("fetch", (event) => {
  const request = handleRequest(event);
  
  // Respond with redirect if valid entry
  // If not, respond with 404
  if (request !== null) {
    event.respondWith(request);
  } else {
    event.respondWith(new Response('404 not found', {
      status: 400
    }))
  }
});

async function handleRequest(event) {
  const {
    request
  } = event;
  // The KV key must include "/links/"
  const {
    pathname
  } = new URL(request.url);

  // Socials is a KV Namespace binding
  redirectURL = await Socials.get(pathname)

  if (redirectURL === null) {
    return null // Catch null for 404 status
  }
  // Redirect the user to the domain
  return Response.redirect(redirectURL, 301); // Permanently moved
}
