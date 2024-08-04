export default function renderLocation(location, isAvaliable = true) {
  let attributes;
  if (isAvaliable) {
    attributes = `hx-post="/places" 
      hx-vals='{"locationId": "${location.id}"}'
      hx-target="#interesting-locations"
      hx-swap="beforeend show:top"`;
  } else {
    attributes = `hx-delete="/places/${location.id}"
      hx-confirm='Are you sure you want to delete this location?'
      hx-target="closest li"
      hx-swap="outerHTML"`;
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
