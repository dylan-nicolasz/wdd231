const output = document.querySelector("#submitted-data");
const params = new URLSearchParams(location.search);

const labels = {
  name: "Name",
  email: "Email",
  region: "Preferred region",
  experience: "Experience",
  date: "Travel date",
  travelers: "Travelers",
  notes: "Notes"
};

Object.entries(labels).forEach(([key, label]) => {
  const value = params.get(key);
  if (value) {
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = `${label}: `;
    p.append(strong, value);
    output.appendChild(p);
  }
});
