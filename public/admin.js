
async function bookList(){
    let response = await fetch('http://127.0.0.1:3000//listBooks',{
    method: 'GET',
    headers: {
        'Content-Type': 'application/JSON'
    }
})
    //Not sure why the request is not working.

    let listBooks = await response.json();
    console.log(listBooks)
}







