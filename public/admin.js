let response = await fetch('http://127.0.0.1:3000//listBooks',{
    method: 'GET',
    headers: {
        'Content-Type': 'application/JSON'
    }
})

let listBooks = await response.json();
console.log(listBooks)

let bookTiles = document.querySelectorAll()


