const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
    enableButtons()
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
            nome_fantasia: document.getElementById('nome_fantasia').value,
            razao_social: document.getElementById('razao_social').value,
            data_cadastro: document.getElementById('data_cadastro').value,
            cnpj: document.getElementById('cnpj').value,
            inscricao_estadual: document.getElementById('inscricao_estadual').value,
            inscricao_municipal: document.getElementById('inscricao_municipal').value,
            cnae: document.getElementById('cnae').value,
            tipo_fornecedor: document.getElementById('tipo_fornecedor').value,
            produto: document.getElementById('produto').value,
            servico: document.getElementById('servico').value,

            tipo_endereco: document.getElementById('tipo_endereco').value,
            tipo_logradouro: document.getElementById('tipo_logradouro').value,
            logradouro: document.getElementById('logradouro').value,
            numero_endereco: document.getElementById('numero_endereco').value,
            bairro: document.getElementById('bairro').value,
            cidade: document.getElementById('cidade').value,
            uf: document.getElementById('uf').value,
            pais: document.getElementById('pais').value,
            cep: document.getElementById('cep').value,
            complemento: document.getElementById('complemento').value,

            nome_contato: document.getElementById('nome_contato').value,
            email_contato: document.getElementById('email_contato').value,
            departamento_contato: document.getElementById('departamento_contato').value,
            email_contato: document.getElementById('email_contato').value,
            ddd_contato: document.getElementById('ddd_contato').value,
            ddi_contato: document.getElementById('ddi_contato').value,
            telefone_contato: document.getElementById('telefone_contato').value,
            ramal_contato: document.getElementById('ramal_contato').value,
            codigo_contato: document.getElementById('codigo_contato').value,
            descricao_contato: document.getElementById('descricao_contato').value
        }

        const index = document.getElementById('nome_fantasia').dataset.index
        if (index == 'new') {
            createFornecedor(fornecedor)
            createRow(fornecedor, index)
            clearFields()
            closeModal()
        } else {
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
        <td>${fornecedor.nome_fantasia}</td>
        <td>${fornecedor.cnpj}</td>
        <td>${fornecedor.uf}</td>
        <td>${fornecedor.tipo_fornecedor}</td>
        <td>${fornecedor.email_contato}</td>
        <td>
            <div class="form-group">
                <input class="checkbox" id="checkbox1" type='checkbox'/>
            </div>
        </td>
        <td>
            <span class="edit material-icons" id="edit" data-index="${index}">edit</span>
            <span class="consult material-icons" id="consult" data-index="${index}">description</span>
            <span class="delete material-icons" id="delete" data-index="${index}">delete</span>
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
    document.getElementById('nome_fantasia').value = fornecedor.nome_fantasia
    document.getElementById('razao_social').value = fornecedor.razao_social
    document.getElementById('data_cadastro').value = fornecedor.data_cadastro
    document.getElementById('cnpj').value = fornecedor.cnpj
    document.getElementById('inscricao_estadual').value = fornecedor.inscricao_estadual
    document.getElementById('inscricao_municipal').value = fornecedor.inscricao_municipal
    document.getElementById('cnae').value = fornecedor.cnae
    document.getElementById('tipo_fornecedor').value = fornecedor.tipo_fornecedor
    document.getElementById('produto').value = fornecedor.produto
    document.getElementById('servico').value = fornecedor.servico

    document.getElementById('tipo_endereco').value = fornecedor.tipo_endereco
    document.getElementById('tipo_logradouro').value = fornecedor.tipo_logradouro
    document.getElementById('logradouro').value = fornecedor.logradouro
    document.getElementById('numero_endereco').value = fornecedor.numero_endereco
    document.getElementById('bairro').value = fornecedor.bairro
    document.getElementById('cidade').value = fornecedor.cidade
    document.getElementById('uf').value = fornecedor.uf
    document.getElementById('pais').value = fornecedor.pais
    document.getElementById('cep').value = fornecedor.cep
    document.getElementById('complemento').value = fornecedor.complemento

    document.getElementById('nome_contato').value = fornecedor.nome_contato
    document.getElementById('email_contato').value = fornecedor.email_contato
    document.getElementById('departamento_contato').value = fornecedor.departamento_contato
    document.getElementById('email_contato').value = fornecedor.email_contato
    document.getElementById('ddd_contato').value = fornecedor.ddd_contato
    document.getElementById('ddi_contato').value = fornecedor.ddi_contato
    document.getElementById('telefone_contato').value = fornecedor.telefone_contato
    document.getElementById('ramal_contato').value = fornecedor.ramal_contato
    document.getElementById('codigo_contato').value = fornecedor.codigo_contato
    document.getElementById('descricao_contato').value = fornecedor.descricao_contato
    document.getElementById('nome_fantasia').dataset.index = fornecedor.index
}

const disableButtons = () => {
    const saveButton = document.getElementById("salvar")
    const cancelButton = document.getElementById("cancelar")
        saveButton.hidden = true;
        cancelButton.hidden = true;
}

const enableButtons = () => {
    const saveButton = document.getElementById("salvar")
    const cancelButton = document.getElementById("cancelar")
        saveButton.hidden = false;
        cancelButton.hidden = false;
}

const editConsultDelete = (event) => {
    if (event.target.id == 'edit'){
        console.log(event.target.id)
        const index = event.target.dataset.index
        console.log(index)
        const fornecedor = readFornecedor()[index]
        console.log(fornecedor)
        fornecedor.index = index
        fillFields(fornecedor)  
        openModal() 
    }
    else if (event.target.id == "consult"){
        console.log(event.target.id)
        const index = event.target.dataset.index
        console.log(index)
        const fornecedor = readFornecedor()[index]
        console.log(fornecedor)
        fornecedor.index = index
        fillFields(fornecedor)  
        openModal() 
        disableButtons()
    }
    else if (event.target.id == "delete"){
        const index = event.target.dataset.index
        const fornecedor = readFornecedor()[index]
        const response = confirm(`Deseja realmente excluir o fornecedor ${fornecedor.nome_fantasia}`)
        if (response) {
            deleteFornecedor(index)
            updateTable()
        }
    }

}

updateTable()

//Eventos
document.getElementById('cadastrarFornecedor')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveFornecedor)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)

document.querySelector('#tableFornecedor>tbody')
    .addEventListener('click', editConsultDelete)

