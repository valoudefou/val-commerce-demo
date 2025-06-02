// utils/analytics.js
export function pushToDataLayer(event, data) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}
