// Load from LocalStorage
let users = JSON.parse(localStorage.getItem("users")) || [
  { name: "Ali", age: 22, role: "Student" },
  { name: "Hisham", age: 25, role: "Admin" },
  { name: "Sara", age: 23, role: "Designer" },
  { name: "Omar", age: 28, role: "Editor" },
];

const usersList = document.getElementById("usersList");
const searchInput = document.getElementById("searchInput");
const roleFilter = document.getElementById("roleFilter");

const nameInput = document.getElementById("nameInput");
const ageInput = document.getElementById("ageInput");
const roleInput = document.getElementById("roleInput");
const addBtn = document.getElementById("addBtn");

let editIndex = null;

/* =============================
   Save Data
============================= */
function saveData() {
  localStorage.setItem("users", JSON.stringify(users));
}

/* =============================
   Display Users
============================= */
function displayUsers(list = users) {
  usersList.innerHTML = "";

  if (list.length === 0) {
    usersList.innerHTML = "<p>No users found</p>";
    return;
  }

  list.forEach((user, index) => {
    usersList.innerHTML += `
      <div class="user">
        <strong>${user.name}</strong>
        <span>(${user.age})</span><br>
        <small>${user.role}</small>

        <div class="actions">
          <button onclick="editUser(${index})">Edit</button>
          <button class="delete" onclick="deleteUser(${index})">
            Delete
          </button>
        </div>
      </div>
    `;
  });
}

/* =============================
   Add / Update
============================= */
addBtn.addEventListener("click", () => {
  let name = nameInput.value.trim();
  let age = Number(ageInput.value);
  let role = roleInput.value.trim();

  if (!name || !age || !role) {
    alert("Please fill all fields");
    return;
  }

  if (age < 1 || age > 100) {
    alert("Invalid Age");
    return;
  }

  if (editIndex === null) {
    users.push({ name, age, role });
  } else {
    users[editIndex] = { name, age, role };
    editIndex = null;
    addBtn.textContent = "Add User";
  }

  saveData();
  displayUsers();
  clearForm();
});

/* =============================
   Delete
============================= */
function deleteUser(index) {
  if (confirm("Delete this user?")) {
    users.splice(index, 1);
    saveData();
    displayUsers();
  }
}

/* =============================
   Edit
============================= */
function editUser(index) {
  let user = users[index];

  nameInput.value = user.name;
  ageInput.value = user.age;
  roleInput.value = user.role;

  editIndex = index;
  addBtn.textContent = "Update User";
}

/* =============================
   Clear
============================= */
function clearForm() {
  nameInput.value = "";
  ageInput.value = "";
  roleInput.value = "";
}

/* =============================
   Search + Filter
============================= */
function filterUsers() {
  let search = searchInput.value.toLowerCase();
  let role = roleFilter.value;

  let result = users.filter((user) => {
    let matchName = user.name.toLowerCase().includes(search);

    let matchRole = role === "All" || user.role === role;

    return matchName && matchRole;
  });

  displayUsers(result);
}

searchInput.addEventListener("input", filterUsers);
roleFilter.addEventListener("change", filterUsers);

/* =============================
   Init
============================= */
displayUsers();
/* =============================
   Theme
============================= */

const themeBtn = document.getElementById("themeBtn");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  let mode = document.body.classList.contains("dark") ? "dark" : "light";

  localStorage.setItem("theme", mode);
});
