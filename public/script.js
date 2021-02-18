const acceptedFiles = [ 'png', 'jpg' ]

const form = document.querySelector('form')

let valid = false

document.querySelector('#upImg').addEventListener('change', (event) => {
    const file = event.target.value.replace('C:\\fakepath\\', '')
    const fileExtension = /\.(.+)$/.exec(file)[1]

    form.classList.remove('notValid')

    const fileTitle = document.querySelector('label > h2')

    if(!acceptedFiles.includes(fileExtension)) {
        console.log('Not accepted')

        form.classList.add('notValid')

        fileTitle.innerText = ` '.${fileExtension}' not allowed`

        return
    }

    valid = true

    fileTitle.innerText = file
})


form.addEventListener('submit', (event) => {
    if(!valid) return event.preventDefault()
})