let myLeads = []
let oldLeads =[]
const inputBtn = document.getElementById("input-btn")
const inputEl = document.querySelector("#input-el")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.querySelector("#delete-btn")
const tabBtn = document.getElementById("tab-btn")

// myLeads = JSON.parse(myLeads)
// myLeads.push("www.yahoo.com")
// myLeads = JSON.stringify(myLeads)
// console.log(typeof myLeads)

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

function render(leads){
    let listItems = ""
    for(let i=0; i<leads.length; i++){
        // listItems += "<li><a target='_blank' href='" + myLeads[i] +"'>" + myLeads[i] +"</a></li>"
        listItems += `  
        <li>
            <a target='_blank' href='${leads[i]}'>
                ${leads[i]}
            </a>
        </li>
    `
        //the following is the breakdown of the above code I have commented out
        //it does the exact same thing as the statement above

        //create element
        // const li = document.createElement("li")

        //set text content
        // li.textContent = myLeads[i]

        //append to ul
        // ulEl.append(li)
    }
ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = " "
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    console.log(localStorage.getItem("myLeads"))
})


