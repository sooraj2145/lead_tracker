import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase,
    ref,
push,
onValue,
remove } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-872e3-default-rtdb.asia-southeast1.firebasedatabase.app/"
  };

const app = initializeApp(firebaseConfig);
const database  = getDatabase(app);

const referenceInDB = ref(database, "leads");



const inputBtn = document.getElementById('input-btn');
const inputEl = document.getElementById('input-el');
const ulEl = document.getElementById('ul-el');
const deleteBtn = document.getElementById('delete-btn');



//refactored function
function render(leads){
    let listItems ="";
    for(let i = 0 ; i < leads.length ; i++){   
       // listItems += "<li><a target='_blank' href='"+ myLeads[i] +" '>" + myLeads[i] + "</a></li>" ;   
       listItems += `
        <li>
            <a target='_blank' href='${leads[i]}'>${leads[i]}
                </a>
        </li>
        `
    }
    ulEl.innerHTML = listItems ;
}




inputBtn.addEventListener('click', function(){
    push(referenceInDB,inputEl.value);
    inputEl.value = "";   
});

/*const tabs= [
    {url:"https://www.linkedin.com/in/per-harald-borgen/"}
]*/

onValue(referenceInDB, function(snapshot){
    const snapshotDoesExist = snapshot.exists();
    if(snapshotDoesExist){
        const snapshotValues = snapshot.val();
        const leads = Object.values(snapshotValues);
        render(leads);
    }
})

deleteBtn.addEventListener('dblclick', function(){   
    remove(referenceInDB);
    ulEl.innerHTML = '';  
});

/*create element ,set textContent, append to element
    let li = document.createElement('li');
    li.textContent = myLeads[i];
    ulEl.append(li);*/
