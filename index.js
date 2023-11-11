import express from 'express';
import path from 'path';

const porta = 3000;
const host = '0.0.0.0';

var listaUsuarios = [];

function processarCadastroUsuario(requisicao, resposta) {
    // processar os parâmetros da url em http://localhost:3000/cadastraUsuario.html?nome=Renato&sobronome=Gonçalves&nomeUsuario=rgoncalves&cidade=PRESIDENTE+PRUDENTE&uf=SP&cep=19015000
    const usuario = {
        nome: requisicao.query.nome,
        sobrenome: requisicao.query.sobronome,
        email: requisicao.query.email,
        aplicação: requisicao.query.aplicacao,
        senhoridade: requisicao.query.senhoridade,
        experiencia: requisicao.query.experiencia,
    }

    listaUsuarios.push(usuario);
    let conteudoResposta = `
    <!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <title>Menu do sistema</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    </head>
    <body>
        <h1>Usuário cadastrados</h1>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Sobronome</th>
                    <th>Email</th>
                    <th>Aplicação</th>
                    <th>Expêriencia/th>
                </tr>
            </thead>
            <tbody> `;

    for (const usuario of listaUsuarios) {
        conteudoResposta += `
                    <tr>
                        <td>${usuario.nome}</td>
                        <td>${usuario.sobrenome}</td>
                        <td>${usuario.email}</td>
                        <td>${usuario.aplicacao}</td>
                        <td>${usuario.senhoridade}</td>
                        <td>${usuario.experiencia}</td>
                    <tr>
                `;
    }

    conteudoResposta+=`
            </tbody>
        </table>
        <a class="btn btn-primary" href="/" role="button">Voltar ao menu</a>
        <a class="btn btn-primary" href="/cadastraUsuarios.html" role="button">Continuar cadastrando</a>
    </body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"></script>

    </html>`;
    resposta.end(conteudoResposta);
}

const app = express();
app.use(express.static(path.join(process.cwd(),'paginas')));

app.get('/', (requisicao, resposta) => {
    resposta.end(`
        <!DOCTYPE html>
            <head>
                <meta charset="UTF-8">
                <title>Pagina para cadastro de usuario</title>
            </head>
            <body>
                <h1>Acesse o Formulario</h1>
                <ul>
                    <li><a href="/cadastraUsuario.html">Cadastrar Usuário</a></li>
                </ul>
            </body>
        </html>
    `);
})
app.get('/cadastrarUsuario', processarCadastroUsuario);

app.listen(porta, host, () => {
    console.log(`Servidor executando na url http://${host}:${porta}`);
});