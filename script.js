
var arr_of_obj = new Set();
var card_title;
var card_item;
var first_card;
var delete_div;
var value_id;
var done_button;
var title_for_list;
var temp;
var title_flag = false;
var subtask = new Map;
//main modal when enabled when clicked on add item
function modal(){
    document.getElementById("modal-div").style.display = "block";
};

//calls create object function with provided input when clicked on 'add' button on modal nad closes modal
function addCard(){
    card_title = document.getElementById("modal-input-box").value;
    var card_title = document.getElementById("modal-input-box").value;
    createObj(card_title);
    closeModal();
}
//changes the display of modal so as to close it
function closeModal(){
    document.getElementById("modal-div").style.display = "none";
}

//creates a object which stores the info about card and calls create a create card function
function createObj(title){
    document.getElementById('empty-list').style.display = 'none'
    var card_obj = {
        title: title,
        id: Date.now(),
        subtask
    };
    arr_of_obj.add(card_obj);
    createCard(card_obj.id);
};
//adds the provided input from modal as list item in the card clicked
function addList(){
    var cloned_list_item = document.querySelector(".this-list-element").cloneNode(true);
    card_item = document.getElementById('modal-input-box-card').value;
    var card_item = document.getElementById('modal-input-box-card').value;
    console.log(value_id);
    cloned_list_item.innerText =  card_item; 
    cloned_list_item.style.display = "block";
    cloned_list_item.setAttribute('id',`${Date.now()}`);
    cloned_list_item.setAttribute('value',`${Date.now()}`);
    cloned_list_item.setAttribute('style',"margin-left: 10px;");
    done_button = document.createElement('button');
    var done_button = document.createElement('button');
    done_button.setAttribute('id',`check-done-${Date.now()}`);
    done_button.setAttribute('class','mark-as-done-class');
    done_button.setAttribute('value',`${Date.now()}`);
    done_button.setAttribute('onclick','completedTask(this.value)');
    done_button.innerText = ' mark as done';
    done_button.setAttribute('style','font-size:15 px;cursor:pointer; height:15px; border-radius:5px;')
    
    cloned_list_item.appendChild(done_button);
    
    cloned_list_item.setAttribute('onClick',"completedTask(this.value)");
    
    
    for(obj of arr_of_obj){
        for(prop in obj){
            if(obj.id == value_id){
                obj.subtask.set(`${card_item}`,`${Date.now()}`);
                card_item = '';
                break;
            }
        }
    }
  
    document.getElementById(`${value_id}`).getElementsByClassName('add-list-after-this')[0].appendChild(cloned_list_item).appendChild(done_button);
    closeCardModal();
}
//changes the display so as to close modal called after every click on add/close button in modal

function closeCardModal(){
    document.getElementById('modal-div-card').style.display = "none";
}
//this function gets triggered when someone clicks on plus button simply making modal appear

function addSubtask(val) {
    document.getElementById("modal-div-card").style.display = "block";
    
    value_id = val;
};

//deletes that from our set of objects as well as from the main container
function deleteCard(val){
    delete_div = document.getElementById(`${val}`);
    var delete_div = document.getElementById(`${val}`);
    
    for(obj of arr_of_obj){
        for(prop in obj){
        if (obj.id==val)
        arr_of_obj.delete(obj);
        break;
        }
    }
    delete_div.parentNode.removeChild(delete_div);
    first_card = 0;
    if(arr_of_obj.size==0){
        document.getElementById('empty-list').style.display = 'block';
    }

    
};


function createCard(){
    if(arr_of_obj.size==0){
    document.getElementById('outer-container').innerHTML = "EMPTY";
    first_card = 0;
    }
    else {
    first_card = document.querySelector('.card').cloneNode(true);
    var first_card = document.querySelector('.card').cloneNode(true);
    display(first_card);
}};


function completedTask(value){
    document.getElementById(`${value}`).style.textDecoration = 'line-through';
    document.getElementById(`${value}`).style.color = '#112D4E';
    document.getElementById(`check-done-${value}`).remove();
    
}
//function below creates the card on main container

function display(card){
    if(card==0){
        document.getElementById('outer-container').innerHTML = "EMPTY";
    }
    else {
    document.getElementById('empty-list').style.display = 'none'
    arr_of_obj.forEach(element => {
        card.id = element.id;
        card.querySelector(".card-head").innerHTML = element.title;
        card.querySelector(".card-head").setAttribute('value',`${element.id}`);
        card.setAttribute("value",`${element.id}`);
        card.setAttribute("display","block");
        card.setAttribute("min-height","300px");
        card.querySelector(".delete-button-in-card").setAttribute("value",`${element.id}`);
        card.querySelector(".delete-button-in-card").setAttribute("onClick","deleteCard(this.value)");
        card.querySelector(".add-button-in-card").setAttribute("value",`${element.id}`);
        card.querySelector(".add-button-in-card").setAttribute("onClick","addSubtask(this.value)");    
    });
    if(title_flag)
    card.style.display = 'none';
    else
    card.style.display = "block";
    document.getElementById("outer-container").appendChild(card);
}}



//it changes all the display to none and just makes the selected card as block
function headerFunc(val){
    var card_header;

    for(let ele of arr_of_obj){
        for(let id in ele){
            if(ele[id]==val){
                card_header = ele.title;
                break;
            };
        };
    };
    
    document.querySelector("#app-name").style.display = 'none';
    document.querySelector("#add-button-text").style.display = 'none';
    for(let ele of arr_of_obj){
    
            if(ele.id==val){
                document.getElementById(`${ele.id}`).style.display = 'block';
            }
            else {
                document.getElementById(`${ele.id}`).style.display = 'none';
            }
    };
    document.getElementById('card-dynamic-head').innerText = `${card_header}`;
    document.getElementById('card-dynamic-head').style.display = 'flex'
    document.getElementById('back-button').style.display = 'block'
    title_flag = true;
};
function displayAll(){
    title_flag = false;
    document.querySelector("#app-name").style.display = 'block';
    document.querySelector("#add-button-text").style.display = 'inline-block';
    document.getElementById('back-button').style.display = 'none';
    for(let ele of arr_of_obj){
            document.getElementById(`${ele.id}`).style.display = 'block';
    };
    document.getElementById('card-dynamic-head').innerText = ``;
    document.getElementById('card-dynamic-head').style.display = 'none';
}