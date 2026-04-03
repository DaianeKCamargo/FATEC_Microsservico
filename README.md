# Microserviço de Pontos de Coleta – Tampets
### 📖 Descrição

Este microserviço é responsável por gerenciar o cadastro e aprovação de pontos de coleta de tampinhas plásticas no sistema Tampets.

O serviço segue o padrão de comunicação REST, permitindo que outras partes do sistema (frontend ou outros serviços) interajam através de requisições HTTP.

O fluxo principal funciona da seguinte forma:

Um usuário envia um cadastro para se tornar um ponto de coleta.
O cadastro é salvo com status pendente.
O administrador analisa o cadastro.
O administrador pode aprovar ou recusar o ponto de coleta.
Após aprovação, o ponto passa a aparecer nas buscas realizadas pelos usuários.


### 🏗 Arquitetura

O microserviço segue uma arquitetura simples baseada em API REST utilizando Node.js e Express.js.

**Fluxo de comunicação:**

<code>Usuário (Frontend) -> API REST -> Microserviço de Pontos de Coleta -> Banco de Dados</code>


**Interface administrativa:**

<code>Admin Dashboard -> API REST -> Microserviço -> Atualização dos dados
</code>


### ⚙️ Tecnologias utilizadas
- Node.js
- Express.js
- API REST
- JSON


## 🚀 Como executar o projeto

Clonar o repositório <br>
> <code>git clone https://github.com/seu-repositorio/tampets-api</code> <br>

Instalar dependências <br>
> <code>npm install <br></code>

Executar o servidor <br>
> <code>node server.js</code> <br>

Servidor disponível em: [Numero da porta pode váriar dependo do localhost]<br>
> <code>http://localhost:3000 </code> 

### 🔗 Endpoints da API
**Cadastrar ponto de coleta** <br>
Cria um novo cadastro de ponto de coleta.

> <code> POST /pontos-coleta </code><br>
<code>Body <br>
{<br>
 "nome": "Pet Shop Central",<br>
 "endereco": "Rua das Flores 123",<br>
 "cidade": "Campinas"<br>
}<br> <code>

Resposta<br>
> <code>{<br>
 "mensagem": "Cadastro enviado para aprovação",<br>
 "ponto": {<br>
   "id": 1,
   "nome": "Pet Shop Central",<br>
   "endereco": "Rua das Flores 123",<br>
   "cidade": "Campinas",<br>
   "status": "pendente"<br>
 }<br>
}</code><br>


### 👨‍💻 Endpoints Administrativos
**Listar pontos pendentes**

Retorna todos os cadastros aguardando aprovação:

> <code>GET /admin/pontos-pendentes</code> <br>

Aprovar ponto de coleta

**Permite que o administrador aprove um cadastro:**

> <code>PUT /admin/aprovar/{id}</code><br>

Exemplo:<br>
> <code>PUT /admin/aprovar/1</code>

Resposta:
> <code>{<br>
 "mensagem": "Ponto aprovado com sucesso"<br>
}</code><br>

### 🔎 Buscar pontos de coleta aprovados

**Retorna todos os pontos aprovados disponíveis para os usuários:**

> <code> GET /pontos-coleta </code> <br>

📍 Buscar pontos próximos

**Permite que usuários encontrem pontos de coleta próximos:**

> <code> GET /pontos-coleta/proximos + parâmetros </code>

**Parâmetros**
Parametro -> Cidade | Tipo -> String | Descrição -> Cidade do Usuário

Exemplo:
> <code> GET /pontos-coleta/proximos?cidade=Campinas</code> <br>

---

### 🔐 Regras de funcionamento
- Novos pontos são cadastrados com status pendente
- Apenas administradores podem aprovar ou recusar cadastros
- Somente pontos aprovados aparecem nas buscas dos usuários
