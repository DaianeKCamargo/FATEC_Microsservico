# Microserviço de Pontos de Coleta – Tampets

### Integrantes:
Daiane Kelly de Almeida Camargo;

Maria Eduarda Moreno Lopes;

Nícolas de Oliveira Dias;

Nicole Janine Bolzani Oliveira;

Sabrina Sant'Ana da Silva Alves;

### 📖 Descrição

Este microserviço é responsável por administrar pontos de coleta de tampinhas plásticas no sistema Tampets.

Ele expõe uma API REST para a equipe administrativa listar pontos pendentes, aprovar cadastros e disponibilizar os pontos aprovados para consulta dos usuários.

Os dados são mantidos em memória enquanto o servidor está em execução. Ao reiniciar a aplicação, a lista de pontos é resetada.


### 🏗 Arquitetura

O microserviço segue uma arquitetura simples baseada em API REST utilizando Node.js, Express.js e Axios.

**Fluxo de comunicação:**

<code>Admin Dashboard -> API REST -> Microserviço -> Atualização dos dados</code>

**Consulta pública:**

<code>Frontend -> API REST -> Microserviço -> Retorno dos pontos aprovados</code>

Quando configurada a variável de ambiente <code>UI_CALLBACK_URL</code>, a aprovação de um ponto também envia um callback HTTP para a interface externa.


### ⚙️ Tecnologias utilizadas
- Node.js
- Express.js
- Axios
- API REST
- JSON


## 🚀 Como executar o projeto

Clonar o repositório <br>
> <code>git clone https://github.com/seu-repositorio/tampets-api</code> <br>

Instalar dependências <br>
> <code>npm install <br></code>

Executar o servidor <br>
> <code>node server.js</code> <br>

Servidor disponível em:<br>
> <code>http://localhost:5500</code>

Opcionalmente, defina a URL de callback antes de iniciar o servidor:<br>
> <code>UI_CALLBACK_URL=http://localhost:3000/callback</code>

### 🔗 Endpoints da API

**Listar pontos pendentes**<br>
Retorna todos os pontos com status <code>pendente</code>.

> <code>GET /admin/pontos-pendentes</code>

**Aprovar ponto de coleta**<br>
Marca o ponto como aprovado e, se <code>UI_CALLBACK_URL</code> estiver configurada, envia os dados do ponto para a interface externa.

> <code>PUT /admin/aprovar/:id</code>

Exemplo:
> <code>PUT /admin/aprovar/1</code>

Resposta esperada:
> <code>{<br>
"mensagem": "Ponto aprovado com sucesso",<br>
"ponto": { ... }<br>
}</code>

**Listar pontos aprovados**<br>
Retorna todos os pontos aprovados disponíveis para consulta.

> <code>GET /pontos-coleta</code>

**Buscar pontos aprovados por cidade**<br>
Filtra os pontos aprovados pela cidade informada.

> <code>GET /pontos-coleta/proximos?cidade=Campinas</code>

Parâmetro:
<code>cidade</code> - cidade usada para filtrar os pontos aprovados.

---

### 🔐 Regras de funcionamento
- Os pontos pendentes são mantidos em memória no servidor
- Apenas administradores podem aprovar cadastros
- Somente pontos aprovados aparecem nas buscas dos usuários

### Observação
- Esse microsserviço está sozinho, ou seja, para ve-lo em execução acessar [Protejo Integrador 3](https://github.com/DaianeKCamargo/FATEC_ProjetoIntegrador3)


