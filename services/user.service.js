const fs= require("fs");
const path = require("path")

const DATA_FILE= path.join(__dirname, "../data/users.json")

let users= []
let nextId=1;

function loadUsers(){
    try{
        const data = fs.readFileSync(DATA_FILE, "utf-8")
        users= JSON.parse(data)
        nextId= users.reduce((max,u)=>Math.max(max,u.id),0)+1;

    } catch{
        users= [];
        nextId= 1;
    }
}

function saveUsers() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
}

loadUsers();

exports.getAll = () => users;

exports.getById = id => users.find(u => u.id === id);

exports.create = ({ name, email }) => {
  const user = { id: nextId++, name, email };
  users.push(user);
  saveUsers();
  return user;
};

exports.remove = id => {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return false;

  users.splice(index, 1);
  saveUsers();
  return true;
};