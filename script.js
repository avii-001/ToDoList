//getting all the required elements
const inputBox=document.querySelector(".inputField input");
const addBtn=document.querySelector(".inputField button");
const todoList=document.querySelector(".todoList");
const deleteAllBtn=document.querySelector(".footer button");


//onkeyup event

inputBox.onkeyup = () =>{      
    let userData = inputBox.value;              //getting user entered value
    if (userData.trim() !=0){                     //if user values aren't only spaces
        addBtn.classList.add("active");         //active the button
    }else{
        addBtn.classList.remove("active");    //unactive the button
    }
}
showTasks()

//if the add button is clicked
addBtn.onclick=()=>{
    let userData=inputBox.value;
    let getLocalStorage=localStorage.getItem("New Todo"); //getting LocalStorage
    if (getLocalStorage == null){                                //if localstorage is null
        listArr=[];                                         //creating black array
    }else{
        listArr=JSON.parse(getLocalStorage);                //transforming json string into a js object
    }
    listArr.push(userData);                            //push or add user data
    localStorage.setItem("New Todo",JSON.stringify(listArr));       //transforming js objct into a json string
    showTasks();                                        //calling showTasks function
    addBtn.classList.remove("active");                  //unactive the add button
}

//function to add task list inside Li tag
function showTasks(){
    let getLocalStorage=localStorage.getItem("New Todo"); //getting LocalStorage
    if (getLocalStorage == null){                                //if localstorage is null
        listArr=[];                                         //creating black array
    }else{
        listArr=JSON.parse(getLocalStorage);                //transforming json string into a js object
    }
    const pendingNumb=document.querySelector(".pendingNumb");
    pendingNumb.textContent=listArr.length;               //passing the length value in pending Number
    if (listArr.length>0){
        deleteAllBtn.classList.add('active');               //active the clearall button
    }else{
        deleteAllBtn.classList.remove('active')               //inactive the clearall button
    }
    let newLiTag = "";
    listArr.forEach((element,index) => {
        newLiTag +=`<li>${element}<span class ='icon' onclick="deleteTask(${index})"><i class="fas fa-trash"></i></i></span></li>`; 
    });
    todoList.innerHTML=newLiTag;                            //adding new li tag
    inputBox.value=""                                       //Once task is added, leave the input field blank
     
}

//delete task function
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); //delete or remove the li
    //after remove the li and update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks(); //call the showTasks function
  }


  //delete all task function
  deleteAllBtn.onclick=() =>{
    listArr=[];
    //after delete all the task and update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks(); //call the showTasks function
  }
