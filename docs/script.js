
//declaring global variables
const infoParent = document.querySelector('.info-parent')
const content = document.querySelector('.content')
const body = document.querySelector('body')
const form = document.querySelector('#form1')
const name1 = document.querySelector('#notebook-name')
const color = document.querySelector('#notebook-color')
//isue with inex changing is its value get reset to 0 on each refresh
//temp solution set i to number of notepads
let i;
let croyden = false

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
    drawNtebookContainer(i)
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
        if(i === undefined){
            i = 0
        }
        drawNoteBook(data[j].name,data[j].color,i)
        drawNtebookContainer(`a${i}`)
        i = content.childElementCount
        console.log(i)
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

    // content.addEventListener('click', (e) => {
    //     target = e.target
        
    // })

    function drawNtebookContainer(i){
        const infoParent = document.querySelector('.info-parent')
        const info = document.createElement('div')
        const nav = document.createElement('div')
        const form = document.createElement('form')
        const input = document.createElement('input')
        const button = document.createElement('button')
        const imageCont = document.createElement('div')
        const close = document.createElement('button')

        info.classList.add('notebook-info')
        nav.classList.add('navbar')
        form.id = 'file-form'
        input.type = 'file'
        input.required = true
        input.id = 'file-select'
        input.classList.add('file')
        input.accept = 'image/png image/jpeg'
        button.classList.add('file-submit')
        button.innerText = 'submit'
        imageCont.classList.add('image-flex')
        info.style.display = 'none'
        close.classList.add('prev')
        close.innerText = 'close'

        infoParent.appendChild(info)
        info.appendChild(nav)
        info.appendChild(imageCont)
        nav.appendChild(form)
        form.appendChild(input)
        form.appendChild(button)
        nav.appendChild(close)

        info.classList.add(i)

    }


content.addEventListener('click', (e) => {
    target = e.target
    index = target.classList[1]
    info = document.querySelectorAll('.notebook-info')
    info.forEach(e => {
        if( e.classList[1] === `a${index}`){
            e.style.display = 'block'
            croyden = true

            


        }
    });
})

infoParent.addEventListener('click', e => {
    if(e.target.classList[0] === 'prev')
    e.target.parentNode.parentNode.style.display = 'none'
    croyden = false
})