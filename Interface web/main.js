const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    //clearFields()
    document.getElementById('modal').classList.remove('active')
    
}

const tempFornecedor = {
    id: "123",
    nomeFantasia: "Tesla",
    CNPJ: "123-321",
    uf: "SP"
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
            tipo: document.getElementById('tipo').value,
            contato: document.getElementById('contato').value
        }
        createFornecedor(fornecedor)
        clearFields()
        closeModal()
    }
}

//Eventos
document.getElementById('cadastrarFornecedor')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveFornecedor)


