# 🛠️ Projeto Principia

---

## 🚀 Setup e Inicialização

### 🔧 Backend

O backend está rodando na porta **5000**.

#### Passos para Configuração:

1. **Crie um arquivo `.env`** na raiz do projeto com as suas credenciais do MongoDB:

   ```plaintext
   DB_PASSWORD=principia
   DB_USER=principia
   DB_APPNAME=principia
   DB_CLUSTER=electionDB
Instale as dependências do backend:

``` 
npm install
``` 
Inicie o servidor:
``` 
node server
``` 
⚠️ Atenção: Certifique-se de que o IP do seu servidor esteja conectado ao MongoDB. Para isso, acesse o MongoDB e clique no toast para adicionar o IP no dashboard. Após inicializar, ele vai detectar seu IP e solicitar a conexão.

🌐 Frontend
Passos para Configuração:
Instale as dependências do frontend:

``` 
npm install
``` 
Inicie a aplicação:
``` 
npm start
``` 
📚 Tecnologias Utilizadas
Node.js
Express
MongoDB
React 
