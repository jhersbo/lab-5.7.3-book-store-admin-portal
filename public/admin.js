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
        submit.setAttribute('data-button-for', book.title)
        
        deleteBook.setAttribute('data-button-for', book.title)
        
        inputBox.value = book.quantity
        inputBox.setAttribute('data-input-for', book.title)
        
        bookTitle.textContent = book.title
        newBook.append(bookTitle, inputBox, submit, deleteBook)
        document.body.append(newBook)
    });
    
    let inputFields = document.querySelectorAll('input')
    let submitButtons = document.querySelectorAll('.submit')
    let deleteButtons = document.querySelectorAll('.delete')

    submitButtons.forEach(button => {
        button.addEventListener('click', updateQuantity)
    })
    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteBook)
    })

    async function updateQuantity(){
        let individualInputField;
        let bookObject;

        inputFields.forEach(inputArea => {
            if (
                inputArea.getAttribute('data-input-for') === 
                this.getAttribute('data-button-for')
                ){
                    individualInputField = inputArea;
                }
        });
        parsedBooks.forEach(book => {
            if(
                book.title === individualInputField.getAttribute('data-input-for')
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
    async function deleteBook(){
        let bookObject;
        parsedBooks.forEach(book => {
            if (book.title === this.getAttribute('data-button-for')){
                bookObject = book
            }
        })
        await fetch(`http://localhost:3001/removeBook/${specificBookObject.id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
            },
        })

        response = await fetch("http://localhost:3001/listBooks");
        parsedBooks = await response.json();


    }
}

getBooks();
