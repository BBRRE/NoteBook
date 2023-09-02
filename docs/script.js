
//declaring global variables
const content = document.querySelector('.content')
const body = document.querySelector('body')
const form = document.querySelector('#form1')
const name1 = document.querySelector('#notebook-name')
const color = document.querySelector('#notebook-color')
let i = 0


const addNoteBook = document.querySelector('.add-book')
const adbook = document.createElement('button')
adbook.classList.add('trbtn')
adbook.innerText = 'Add NoteBook'
document.body.appendChild(adbook)
adbook.style.display = 'none'

adbook.addEventListener('click', (e) => {
    if(adbook.style.display === 'block'){
    addNoteBook.style.display = 'block'
    adbook.style.display = 'none'

    }      
})
addNoteBook.style.display = 'none'
takeFromDatabase().then(startUp())


form.addEventListener( 'submit', (e) => {
    e.preventDefault()

    drawNoteBook(name1.value,color.value,i)
    addToDatabase(i)
    i = i + 1
    // Console.log(i)
})





function drawNoteBook(nameValue,colorValue,i){
    const note = document.createElement('div')
    note.classList.add(`notebook-container`)
    note.classList.add(`${i}`)
    const label = document.createElement('div')
    label.classList.add('label')
    const title = document.createElement('span')
    title.classList.add('notebook-name')

    content.appendChild(note)
    note.appendChild(label)
    label.appendChild(title)

label.innerText = nameValue
note.style.backgroundColor = colorValue

addNoteBook.style.display = 'none'
adbook.style.display = 'block'
}

async function takeFromDatabase(){
    const res = await fetch('/lol')
    let data = await res.json()
    console.log(data)
    for(j = 0; j < data.length; j++){
        console.log(data[j].name,data[j].color)
        drawNoteBook(data[j].name,data[j].color,data[j].index)
    }
}

async function addToDatabase(i){
    res = await fetch('/',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            name:name1.value,
            color:color.value,
            index: i
        })
    })
    data = await res.json()
    console.log(data)
}
function startUp(){
    addNoteBook.style.display = 'none'
    if (!content.hasChildNodes()) {
        
        addNoteBook.style.display = 'block'
        console.log(addNoteBook)
    }else{
        addNoteBook.style.display = 'none'
    }}
    
    // console.log(data[j].name,data[j].color)
    // drawNoteBook(data[j].name,data[j].color)

    content.addEventListener('click', (e) => {
        target = e.target
        
    })

    