export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.hostname === "img.bogas04.fyi") {
      return Response.redirect("https://bogas04.fyi/images/", 301);
    }
    return fetch(request);
  },
};
