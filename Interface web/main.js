const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    //clearFields()
    document.getElementById('modal').classList.remove('active')

}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_fornecedor')) ?? []
const setLocalStorage = (dbFornecedor) => localStorage.setItem("db_fornecedor", JSON.stringify(dbFornecedor))

//crud
//delete
const deleteFornecedor = (index) => {
    const dbFornecedor = readFornecedor()
    dbFornecedor.splice(index, 1)
    setLocalStorage(dbFornecedor)
}

//update
const updateFornecedor = (index, fornecedor) => {
    const dbFornecedor = readFornecedor()
    dbFornecedor[index] = fornecedor
    setLocalStorage(dbFornecedor)
}

//read
const readFornecedor = () => getLocalStorage()

//create
const createFornecedor = (fornecedor) => {
    const dbFornecedor = getLocalStorage()
    dbFornecedor.push(fornecedor)
    setLocalStorage(dbFornecedor)
}

//Interação com layout
const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
}

const saveFornecedor = () => {
    if (isValidFields()) {
        const fornecedor = {
            nome: document.getElementById('nome').value,
            cnpj: document.getElementById('cnpj').value,
            uf: document.getElementById('uf').value,
            tipo: document.getElementById('tipo').value,
            email: document.getElementById('email').value
        }
        const index = document.getElementById('nome').dataset.index
        if(index =='new'){
            createFornecedor(fornecedor)
            clearFields()
            closeModal()
        }else{
            updateFornecedor(index, fornecedor)
            closeModal()
        }
    }
    updateTable()
}

const createRow = (fornecedor, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${index}</td>
        <td>${fornecedor.nome}</td>
        <td>${fornecedor.cnpj}</td>
        <td>${fornecedor.uf}</td>
        <td>${fornecedor.tipo}</td>
        <td>${fornecedor.email}</td>
        <td>
            <div class="form-group">
                <input class="checkbox" id="checkbox1" type='checkbox'/>
            </div>
        </td>
        <td>
            <button type="button" class="button edit"><span class="material-icons Icon" id="edit-${index}">edit</span></button>
            <button type="button" class="button consult"><span class="material-icons Icon" id="consult-${index}">description</span></button>
            <button type="button" class="button delete"><span class="material-icons Icon" id="delete-${index}">delete</span></button>
        </td>
        `
    document.querySelector('#tableFornecedor>tbody').appendChild(newRow)
}

const updateTable = () => {
    const dbFornecedor = readFornecedor()
    clearTable()
    dbFornecedor.forEach(createRow)
}


const clearTable = () => {
    const rows = document.querySelectorAll('#tableFornecedor>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}


const fillFields = (fornecedor) => {
    document.getElementById('nome').value = fornecedor.nome
    document.getElementById('cnpj').value = forncedor.cnpj
    document.getElementById('tipo').value = fornecedor.tipo
    document.getElementById('contato').value = fornecedor.contato
    document.getElementById('nome').dataset.index = fornecedor.index
}

const editFornecedor = (index) => {
    const fornecedor = readFornecedor()[index]
    fornecedor.index = index
    fillFields(fornecedor)
    openModal()
}

const edit = (event) => {
    const openModal = () => document.getElementById('modal')
    .classList.add('active')

    if (event.target.class == 'button edit'){ 
        const [action, index] = event.target.id.split('-')
        editFornecedor(index)
    }
}

//Eventos
document.getElementById('cadastrarFornecedor')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveFornecedor)

document.querySelector('#tableFornecedor>tbody')
    .addEventListener('click', edit)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)
