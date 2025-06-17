# AutoGyn - Sistema de Gestão para Oficinas Mecânicas

## 📌 Visão Geral

O **AutoGyn** é um sistema de gestão para oficinas mecânicas, desenvolvido como projeto acadêmico. Seu foco é o controle de **ordens de serviço**, **peças**, **estoque** e **fluxo financeiro**.

O projeto adota uma arquitetura **full stack**, com um **backend em Java (Spring Boot)** e um **frontend moderno em Angular**. Foram aplicadas boas práticas de **Engenharia de Software** e diversos **padrões de projeto (Design Patterns)**.

---

## 🖥️ Stack Tecnológica

### Backend (API REST - Java Spring Boot)

* **Linguagem:** Java 17
* **Framework:** Spring Boot 3.2
* **Banco de Dados:** H2 (em memória)
* **ORM:** Hibernate 6.x
* **Segurança:** Spring Security + JWT (JSON Web Token)
* **Documentação:** OpenAPI 3.0 (Swagger)

### Frontend (Web UI - Angular)

* **Framework:** Angular 17
* **Componentes UI:** PrimeNG 17
* **State Management:** Signals
* **Build Tool:** Vite

---

## 📦 Pré-requisitos para Executar o Projeto

| Tecnologia  | Versão mínima |
| ----------- | ------------- |
| Java        | 17            |
| Maven       | 3.9+          |
| Node.js     | 18.x          |
| Angular CLI | 17.x          |

---

## 🚀 Passo a Passo de Execução

### 1️⃣ Backend (Spring Boot)

#### ✅ Passo 1: Build e execução

Navegue até a pasta backend e execute:

```bash
cd backend
./mvnw spring-boot:run
```

Caso prefira usar o Maven local:

```bash
mvn spring-boot:run
```

---

#### ✅ Passo 2: Console do Banco H2

Acesse via navegador:

* **URL:**
  [http://localhost:8085/h2-console](http://localhost:8085/h2-console)

* **Configuração padrão:**

  * **JDBC URL:** `jdbc:h2:mem:testdb`
  * **User:** `sa`
  * **Senha:** *(em branco)*

---

#### ✅ Passo 3: Documentação da API (Swagger)

Acesse a documentação interativa:

* **URL:**
  [http://localhost:8085/swagger-ui.html](http://localhost:8085/swagger-ui.html)

---

### 2️⃣ Frontend (Angular)

#### ✅ Passo 1: Instalar as dependências

```bash
cd frontend
npm install
```

---

#### ✅ Passo 2: Rodar a aplicação Angular

```bash
ng serve
```

Acesse em:

* **URL:**
  [http://localhost:4200](http://localhost:4200)

---

### ✅ Rodando os Testes

#### Testes Backend (Java)

* **Testes Unitários:**

```bash
./mvnw test
```

* **Testes de Integração (se configurados):**

```bash
./mvnw verify -Pintegration
```

---

#### Testes Frontend (Angular)

```bash
ng test
```

---

## 🧱 Estrutura de Pastas

```bash
autogyn/
├── backend/
│   ├── src/main/java/
│   │   └── com/autogyn/
│   │       ├── config/
│   │       ├── controllers/
│   │       ├── models/
│   │       ├── repositories/
│   │       ├── services/
│   │       └── security/
│   └── src/main/resources/
│       ├── application.yml
│       └── db/migration/
│
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── components/
    │   │   │   ├── clientes/
    │   │   │   ├── estoque/
    │   │   │   ├── ordens/
    │   │   │   ├── pagamentos/
    │   │   │   └── veiculos/
    │   │   ├── models/
    │   │   ├── services/
    │   │   └── shared/
    │   ├── assets/
    │   └── styles/
    ├── angular.json
    └── package.json
```

---

## 📐 Padrões de Projeto Implementados

| Padrão     | Onde foi aplicado         | Benefício                             |
| ---------- | ------------------------- | ------------------------------------- |
| Repository | Camada de persistência    | Isolamento e facilidade de manutenção |
| Strategy   | Validação de documentos   | Flexibilidade para múltiplas regras   |
| Observer   | Notificações de pagamento | Baixo acoplamento                     |
| Factory    | Geração de relatórios     | Extensibilidade para novos formatos   |

---

## 👨‍💻 Autores

Projeto acadêmico desenvolvido pelos alunos da **Universidade SENAI FATESG**:

* Gabriel Viana Nunes
* Thiago Matheus Pinheiro
* João Vitor Mamede

---

## 📄 Licença

Este projeto é licenciado sob a **Licença MIT**. Consulte o arquivo `LICENSE` para mais detalhes.

---

