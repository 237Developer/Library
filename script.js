const myLibrary=[];

//pattern of book. 

class Book{
   constructor(title, author, coverImageUrl, status){
    this.id=crypto.randomUUID();
    this.title=title;
    this.author=author;
    this.coverImageUrl=coverImageUrl;
    this.status=status;
   }
}

function addBookToLibrary(title, author, coverImageUrl, status){
    myLibrary.push(new Book(title, author, coverImageUrl, status))
}

const container=document.querySelector(".container"); 

function displayBook(){
    container.innerHTML="";
    for(let i=0; i<myLibrary.length; i++){
        const card=document.createElement("div");
        card.innerHTML=`
                <h2>${myLibrary[i].title}</h2>
                <h3>By ${myLibrary[i].author}</h3>
                <img src="${myLibrary[i].coverImageUrl}" alt="cover-image">
                <button class="read-status" style="background-color:${myLibrary[i].status==="Unread" ? "rgb(255, 96, 96)": "#b4f688"}"> ${myLibrary[i].status}</button>
                <button class="delete"><img src="images/delete_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="delete-icon"></button>
                `
            card.setAttribute("data-id",myLibrary[i].id)
        container.append(card);
    }
}

const addBook=document.getElementById("add-book");

const form=document.querySelector("form");
const formDialog=document.querySelector(".form-dialog");
const saveBtn=document.querySelector(".save-btn");
const cancelBtn=document.querySelector(".cancel-btn");

const title=document.getElementById("title");
const author=document.getElementById("author");
const coverImageUrl=document.getElementById("image");
const statusChoices=document.querySelectorAll("input[name='status']");

addBook.addEventListener("click", () => {
    formDialog.showModal();
});

cancelBtn.addEventListener("click", () => {
    formDialog.close();
        form.reset(); 
});

// display card when click save button

form.addEventListener("submit", (e)=>{
    e.preventDefault();
        let statusValue = "Read"; // Default value
    
    for (let i = 0; i < statusChoices.length; i++) {
        if (statusChoices[i].checked) {
            statusValue = statusChoices[i].value; //
            break; //
        }
    }
    addBookToLibrary(title.value, author.value, coverImageUrl.value, statusValue);
    displayBook();
    formDialog.close();
    form.reset();
})

//change the status of the element in the table. 

container.addEventListener("click", (e)=>{
    if(e.target.matches(".read-status")){
       const cardIdtoDelete=e.target.closest("div").dataset.id;
       const index= myLibrary.findIndex(book=>book.id==cardIdtoDelete);
       if(index!==-1){
        if(myLibrary[index].status==="Read") {
            myLibrary[index].status="Unread"
        } else {
            myLibrary[index].status="Read";
        }
       }
       displayBook();
    }
})

//Delete Book : we need to remove book to the table myLibrary when cliking on the delete button and display remaning card.
//but before, show confirmation dialog. 

const confirmationDialog=document.querySelector(".confirmation-dialog");
const yesBtn=document.querySelector(".yes-btn");
const noBtn=document.querySelector(".no-btn");

let cardIdtoDelete=null; 

container.addEventListener("click", (e)=>{
    if(e.target.parentElement.matches(".delete")){
        cardIdtoDelete=e.target.closest("div").dataset.id;
        const index=myLibrary.findIndex((book)=>book.id==cardIdtoDelete);
        if(index!==-1){
            confirmationDialog.firstElementChild.firstElementChild.innerHTML = `Are you sure you want to delete ${myLibrary[index].title}`;
            confirmationDialog.showModal();
        }
    }
})

confirmationDialog.addEventListener("click", (e)=>{
    if(e.target==yesBtn){
        myLibrary.splice(cardIdtoDelete, 1); 
        displayBook();
        confirmationDialog.close()
    }else{
        confirmationDialog.close();
    }
    confirmationDialog.firstElementChild.firstElementChild.innerHTML="";
});
