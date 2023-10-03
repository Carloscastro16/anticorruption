import * as data from '../db/incidents.js';
export function getAllIncidents() {
    console.log(data.incidents);
}
export function searchById(id) {
    let incidentData = data.incidents.find(incident => incident.id == id);
    console.log(incidentData);
    return incidentData;
}
export function filterByCategory(type) {
    let fullData = data.incidents.filter(incident => incident.corruptionType == type);
    console.log(fullData);
}
