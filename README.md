# contact-manager-front  

**Objetivo:**  
Interface web para gerenciar relações entre pessoas e seus contatos, integrada com a [API back-end Java Spring Boot](https://github.com/Carlos-DMS/contact-manager).

**Contexto:**  
Este projeto foi desenvolvido durante o processo de capacitação para a Indra Minsait, como parte de uma avaliação técnica.

---

## Tecnologias e Dependências

- **Framework:** Angular 16.2.16
- **UI Kit:** Bootstrap (configuração SCSS)
- **Integração Externa:** [ViaCEP API](https://viacep.com.br/)
- **Principais Dependências:**
  - RxJS (gestão de streams de dados)
  - SweetAlert2 (notificações interativas)
  - Angular Router (gerenciamento de rotas)
- **Ambiente:** Node.js (16.x - 18.x)

---

## Pré-requisitos

- **Node.js 16.x - 18.x:** [Download Node.js](https://nodejs.org/)
- **npm:** Gerenciador de pacotes (incluído com Node.js)
- **Back-End em Execução:** [contact-manager](https://github.com/Carlos-DMS/contact-manager) rodando na porta 8080

---

## Instalação e Execução

1. **Clone o Repositório:**
   ```bash
   git clone https://github.com/Carlos-DMS/contact-manager-front.git
   

2. **Instale as Dependências:**
   ```bash
   npm install
   ```

3. **Inicie o Projeto:**
   ```bash
   ng serve
   ```

4. **Acesse a Aplicação:**
    - Front-end: [http://localhost:4200](http://localhost:4200)

---

## Configuração do Ambiente

A URL da API está definida em:
```typescript
// environment.ts
export const environment = {
  url: 'http://localhost:8080/api'
};
```

---

## Funcionalidades Principais

- **Gestão de Pessoas:**
    - Listagem de pessoas
    - Busca de pessoas pelo nome
    - Cadastro (integração com ViaCEP para autocompletar e validar endereços)
    - Edição (integração com ViaCEP para autocompletar e validar endereços)
    - Exclusão

- **Gestão de Contatos:**
    - Listagem dos contatos de uma pessoa
    - Cadastro
    - Edição
    - Exclusão

- **Informações adicionais**
    - Alertas interativos com SweetAlert2
    - Exibição clara de erros retornados pela API
    - Prevenção de operações inválidas

---

## Estrutura do Projeto

```
src/app/
├── components/    # Componentes reutilizáveis
├── pages/         # Páginas principais
├── interfaces/    # Tipos e contratos TypeScript
├── services/      # Comunicação com a API
environments/      # Configurações de ambiente
```

---

## Contribuição

Contribuições são bem-vindas! Caso deseje contribuir:

- **Issues:** Abra uma _issue_ para sugerir melhorias ou reportar bugs
- **Pull Requests:** Envie suas contribuições seguindo:
    - Commits com prefixos (`feat:`, `fix:`, `wip:`)
    - Mensagens claras e objetivas

---

## Melhorias Futuras

- Implementação de testes automatizados
- Filtros avançados para busca
- Paginação de resultados

---

## Contato

- **LinkedIn:** [Carlos Daniel Martins Sanguino](https://www.linkedin.com/in/carlos-daniel-martins-sanguino-72b46a2a0/)
- **Email:** [carlos.dsanguino@gmail.com](mailto:carlos.dsanguino@gmail.com)

---

**Importante:** Para funcionamento completo, execute em conjunto com o [back-end](https://github.com/Carlos-DMS/contact-manager).
