import java.util.Collection;

public class Fornecedor {
    
    private boolean isRascunho;
    private int id;
    private String email;
    private String cnpj;
    private String inscricaoEstadual;
    private String inscricaoMunicipal;
    private long dtCadastro;
    private String rzSocial;
    private String nmFantasia;

    private Endereco endereco;
    private Status status;

    private Collection<TipoFornecimento> tipoFornecimento;
    private Collection<Cnae> codigosCnae;
    private Collection<Contato> contatos;
    private Collection<Telefone> telefones;
    private Collection<Produto> produtos;
    private Collection<Servico> servicos;
    private Collection<Os> OsRegistradas;
    private Collection<Empresa> empresas;


    public void salvar(){

    }

    public void alterar(){

    }

    public Fornecedor[] consultar(){
        return null;
    }

    public void excluir(){
        
    }

    public void inativar(){
        
    }

    public void ativar(){
        
    }

    public void addContato(Contato contato){
        
    }

    public void validarCNPJ(){

    } 

    public void validarListaFornecimento(){

    }
}
