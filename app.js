const form = document.getElementById("incident-form");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const statusInput = document.getElementById("status");
const list = document.getElementById("incident-list");
const filter = document.getElementById("filter");

// Cargar incidencias al iniciar
document.addEventListener("DOMContentLoaded", loadIncidents);

// Evento al enviar formulario
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const incident = {
    id: Date.now(),
    title: titleInput.value.trim(),
    description: descriptionInput.value.trim(),
    status: statusInput.value,
  };

  addIncident(incident);
  saveIncident(incident);

  form.reset();
});

// Evento filtro
filter.addEventListener("change", loadIncidents);

// Añadir incidencia al DOM
function addIncident(incident) {
  const tr = document.createElement("tr");

  // Título
  const tdTitle = document.createElement("td");
  tdTitle.textContent = incident.title;

  // Descripción
  const tdDesc = document.createElement("td");
  tdDesc.textContent = incident.description;

  // Estado
  const tdStatus = document.createElement("td");
  tdStatus.textContent = formatStatus(incident.status);
  tdStatus.classList.add(incident.status);

  // Acciones
  const tdActions = document.createElement("td");

  // Botón cambiar estado
  const btnStatus = document.createElement("button");
  btnStatus.textContent = "Cambiar";
  btnStatus.onclick = () => updateStatus(incident.id);

  // Botón eliminar
  const btnDelete = document.createElement("button");
  btnDelete.textContent = "Eliminar";
  btnDelete.style.marginLeft = "5px";
  btnDelete.onclick = () => deleteIncident(incident.id);

  tdActions.appendChild(btnStatus);
  tdActions.appendChild(btnDelete);

  tr.appendChild(tdTitle);
  tr.appendChild(tdDesc);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);

  list.appendChild(tr);
}

// Guardar en localStorage
function saveIncident(incident) {
  const incidents = getIncidents();
  incidents.push(incident);
  localStorage.setItem("incidents", JSON.stringify(incidents));
}

// Obtener incidencias
function getIncidents() {
  return JSON.parse(localStorage.getItem("incidents")) || [];
}

// Cargar incidencias
function loadIncidents() {
  list.innerHTML = "";

  const incidents = getIncidents();
  const selectedFilter = filter.value;

  const filtered = incidents.filter((inc) => {
    return selectedFilter === "all" || inc.status === selectedFilter;
  });

  filtered.forEach(addIncident);
}

// Eliminar incidencia
function deleteIncident(id) {
  let incidents = getIncidents();
  incidents = incidents.filter((inc) => inc.id !== id);
  localStorage.setItem("incidents", JSON.stringify(incidents));
  loadIncidents();
}

// Cambiar estado (ciclo)
function updateStatus(id) {
  const incidents = getIncidents();

  const updated = incidents.map((inc) => {
    if (inc.id === id) {
      if (inc.status === "pendiente") return { ...inc, status: "en_progreso" };
      if (inc.status === "en_progreso") return { ...inc, status: "resuelta" };
      return { ...inc, status: "pendiente" };
    }
    return inc;
  });

  localStorage.setItem("incidents", JSON.stringify(updated));
  loadIncidents();
}

// Formatear texto de estado
function formatStatus(status) {
  switch (status) {
    case "pendiente":
      return "Pendiente";
    case "en_progreso":
      return "En progreso";
    case "resuelta":
      return "Resuelta";
    default:
      return status;
  }
}
``;
