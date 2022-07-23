const dropArea = document.querySelector('.drag-and-drop-area')
const dragText = document.querySelector('h1')
const button = document.querySelector('.browse-file-btn')
const input = document.querySelector('input')
const resultFileName = document.querySelector('.result_file-name')
const resultFileSize = document.querySelector('.result_file-size')
const resultFileExtension = document.querySelector('.result_file-extension')
const uploadAgainBtn = document.querySelector('.control button')
const modal = document.querySelector('.modal')
const resultImage = document.querySelector('.modal__info-img img')
const modalOverlay = document.querySelector('.modal__overlay')

let file = null

button.addEventListener('click', () => {
  input.click()
})

input.addEventListener('change', (e) => {
  const [firstFile] = e.target.files
  file = firstFile
  dropArea.classList.add('active')
  showModal()
})

dropArea.addEventListener('dragover', (e) => {
  e.stopPropagation()
  e.preventDefault()
  dropArea.classList.add('active')
  dragText.textContent = 'Release to Upload Image'
})

dropArea.addEventListener('dragleave', (e) => {
  const { top, bottom, left, right } = dropArea.getBoundingClientRect()
  const { clientX, clientY } = e

  if (
    clientY < top ||
    clientY >= bottom ||
    clientX < left ||
    clientX >= right
  ) {
    dropArea.classList.remove('active')
    dragText.textContent = 'Drag & Drop to Upload Image'
  }
})

dropArea.addEventListener('drop', (e) => {
  e.preventDefault()
  file = e.dataTransfer.files[0]
  showModal()
})

function hideModal() {
  modal.classList.remove('active')
  dropArea.classList.remove('active')
  file = null
  resultImage.src = ''
  resultFileName.innerHTML = ''
  resultFileSize.innerHTML = ''
  resultFileExtension.innerHTML = ''
  input.value = ''
}

function showModal() {
  const { name: fileName, size: fileSize, type } = file
  const fileType = type.split('/')[1]

  resultImage.src = URL.createObjectURL(file)
  resultFileName.innerHTML = addTextInsideAndOutside('File Name', fileName)
  resultFileSize.innerHTML = addTextInsideAndOutside('File Size', fileSize)
  resultFileExtension.innerHTML = addTextInsideAndOutside(
    'File Extension',
    fileType,
  )

  modal.classList.add('active')

  modalOverlay.addEventListener('click', hideModal)
  uploadAgainBtn.addEventListener('click', hideModal)
}

function addTextInsideAndOutside(insideText, outsideText) {
  return `<span class="result-heading">${insideText}</span>${outsideText}`
}
