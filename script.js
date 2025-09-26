let passwords = JSON.parse(localStorage.getItem("passvault")) || [];
let formVisible = false;

const list = document.getElementById("list");
const searchInput = document.getElementById("searchInput");
const countDisplay = document.getElementById("count");
const passwordHeader = document.getElementById("passwordHeader");
const searchBar = document.getElementById("searchBar");
const fab = document.getElementById("fab");
const enterBtn = document.getElementById("enterBtn");
const formSection = document.getElementById("formSection");

function showHomePage() {
  if(passwords.length === 0){
    enterBtn.style.display = "block";
    passwordHeader.style.display = "none";
    searchBar.style.display = "none";
    fab.style.display = "none";
  } else {
    enterBtn.style.display = "none";
    passwordHeader.style.display = "block";
    searchBar.style.display = "flex";
    fab.style.display = "block";
  }
}

function render() {
  const filter = searchInput.value.toLowerCase();
  list.innerHTML = "";
  const filtered = passwords.filter(p => p.site.toLowerCase().includes(filter) || p.username.toLowerCase().includes(filter));
  countDisplay.textContent = `Total: ${filtered.length}`;
  if(filtered.length === 0){
    list.innerHTML = "<p style='text-align:center; opacity:0.8;'>No matching passwords.</p>";
    return;
  }
  filtered.forEach((p, i) => {
    list.innerHTML += `
      <div class="card">
        <b>🌐 ${p.site}</b><br>
        👤 ${p.username}<br><br>
        <button class="btn-copy" onclick="copyPassword('${p.password}')">📋 Copy password</button>
        <button class="btn-del" onclick="deletePassword(${i})">🗑 Delete userID</button>
      </div>
    `;
  });
}

function toggleForm(){
  formVisible = !formVisible;
  formSection.style.display = formVisible ? "block" : "none";
}

function addPassword() {
  const site = document.getElementById("site").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  if(site && username && password){
    passwords.push({site, username, password});
    localStorage.setItem("passvault", JSON.stringify(passwords));
    document.getElementById("site").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    formSection.style.display = "none";
    showHomePage();
    render();
  } else {
    alert("Please fill all fields!");
  }
}

function deletePassword(i){
  if(confirm("Delete this password?")){
    passwords.splice(i,1);
    localStorage.setItem("passvault", JSON.stringify(passwords));
    showHomePage();
    render();
  }
}

function copyPassword(pwd){
  navigator.clipboard.writeText(pwd);
  alert("Password copied!");
}

enterBtn.addEventListener("click", toggleForm);
searchInput.addEventListener("input", render);

// Initialize home page
showHomePage();
render();
