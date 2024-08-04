export default function renderLocation(location, isAvaliable = true) {
  let attributes;
  if (isAvaliable) {
    attributes = `hx-post="/places" 
      hx-vals='{"locationId": "${location.id}"}'
      hx-target="#interesting-locations"
      hx-swap="beforeend show:#interesting-locations-section:top"
      data-action="add"
      `;
  } else {
    attributes = `hx-delete="/places/${location.id}"
      hx-target="closest li"
      hx-swap="outerHTML"
      data-action="remove"
     `;
  }
  return `
    <li class="location-item">
      <button ${attributes}>
        <img src="${`/images/${location.image.src}`}" alt="${location.image.alt}" />
        <h3>${location.title}</h3>
      </button>
    </li>
  `;
}
