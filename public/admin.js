async function getBooks(){
    let response = await fetch("http://localhost:3001/listBooks")
    let parsedBooks = await response.json()

    parsedBooks.forEach(book => {
        let newBook = document.createElement('div')
        let bookTitle = document.createElement('h3')
        let inputBox = document.createElement('input')
        let submit = document.createElement('button')
        let deleteBook = document.createElement('button')
        
        deleteBook.classList.add('delete')
        deleteBook.textContent = 'Delete Book'
        
        submit.classList.add('submit')
        submit.textContent = 'Submit!'
        submit.setAttribute('button-for', book.title)
        
        deleteBook.setAttribute('button-for', book.title)
        
        inputBox.value = book.quantity
        inputBox.setAttribute('input-for', book.title)
        
        bookTitle.textContent = book.title
        newBook.append(bookTitle, inputBox, submit, deleteBook)
        document.body.append(newBook)
    });

    // add input fields and buttons. callbacks are written further down in the document
    
    let inputFields = document.querySelectorAll('input')
    let submitButtons = document.querySelectorAll('.submit')
    let deleteButtons = document.querySelectorAll('.delete')

    submitButtons.forEach(button => {
        button.addEventListener('click', updateQuantity)
    })
    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteBook)
    })

    // function to update the book quantities

    async function updateQuantity(){
        let individualInputField;
        let bookObject;

        inputFields.forEach(inputArea => {
            if (
                inputArea.getAttribute('input-for') === 
                this.getAttribute('button-for')
                ){
                    individualInputField = inputArea;
                }
        });
        parsedBooks.forEach(book => {
            if(
                book.title === individualInputField.getAttribute('input-for')
            ){
                bookObject = book
            }
        });

        await fetch("http://localhost:3001/updateBook", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: bookObject.id,
                title: bookObject.title,
                year: bookObject.year,
                description: bookObject.description,
                quantity: individualInputField.value,
                imageURL: bookObject.imageURL,
            }),
        });
    }

    //function to delete books

    async function deleteBook(){
        let bookObject;
        parsedBooks.forEach(book => {
            if (book.title === this.getAttribute('button-for')){
                bookObject = book
            }
        })
        await fetch(`http://localhost:3001/removeBook/${bookObject.id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
            },
        })

        //updates the server-side list
        response = await fetch("http://localhost:3001/listBooks");
        parsedBooks = await response.json();


    }
} 

//instantiation 
getBooks();
