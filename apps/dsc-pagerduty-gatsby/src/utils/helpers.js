const strapiURL = process.env.GATSBY_STRAPI_URL || "http://localhost:1337";

const strapiRoute = (route) => new URL(route, strapiURL).href;

module.exports = { strapiRoute, strapiURL }