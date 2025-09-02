
# Cardápio Digital - Projeto Integrador

Este projeto é uma aplicação web desenvolvida com Next.js para gerenciamento de pedidos em restaurantes, bares ou lanchonetes. O sistema permite que clientes visualizem o cardápio, façam pedidos, acompanhem o status e realizem cadastro/login, enquanto administradores podem gerenciar produtos, categorias, mesas e pedidos.

## Funcionalidades

### Cliente
- Visualização do cardápio por categorias
- Adição de produtos ao carrinho
- Cadastro e login de usuário
- Recuperação de senha
- Confirmação de pedidos
- Acompanhamento do status do pedido
- Chamada de garçom

### Administrador
- Cadastro, edição e exclusão de produtos
- Gerenciamento de categorias
- Controle de mesas e comandas
- Visualização e atualização de pedidos
- Dashboard de pedidos em tempo real

## Tecnologias Utilizadas
- [Next.js](https://nextjs.org/) (React)
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [Axios](https://axios-http.com/) para requisições HTTP
- [Context API](https://react.dev/reference/react/useContext) para gerenciamento de estado global

## Estrutura de Pastas
```
frontend/
├── public/           # Imagens e arquivos estáticos
├── src/
│   ├── api/          # Serviços de integração com backend
│   ├── app/          # Páginas e rotas principais
│   ├── assets/       # Imagens e ícones
│   ├── auth/         # Autenticação e contexto
│   ├── components/   # Componentes reutilizáveis
│   ├── constants/    # Constantes globais
│   ├── layouts/      # Layouts de páginas
│   ├── lib/          # Configuração de store e slices
│   ├── routes/       # Rotas customizadas
│   ├── sections/     # Views específicas
│   ├── utils/        # Funções utilitárias
│   └── globals.css   # Estilos globais
├── package.json      # Dependências e scripts
├── next.config.mjs   # Configuração do Next.js
└── README.md         # Documentação
```

## Instalação

1. Clone o repositório:
	```bash
	git clone https://github.com/projeto-integradorv/frontend.git
	```
2. Acesse a pasta do projeto:
	```bash
	cd frontend
	```
3. Instale as dependências:
	```bash
	npm install
	```
4. Inicie o servidor de desenvolvimento:
	```bash
	npm run dev
	```

## Configuração
- Certifique-se de configurar as variáveis de ambiente necessárias para integração com o backend (API REST).
- O arquivo de configuração global está em `src/config-global.js`.

## Scripts Disponíveis
- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Gera a versão de produção
- `npm run start`: Inicia o servidor em produção

## Contribuição
1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b minha-feature`)
3. Commit suas alterações (`git commit -m 'Minha feature'`)
4. Faça push para a branch (`git push origin minha-feature`)
5. Abra um Pull Request

## Licença
Este projeto está sob a licença MIT.

## Contato

Dúvidas ou sugestões? Abra uma issue ou entre em contato pelo [GitHub](https://github.com/projeto-integradorv/frontend).

## Sugestões de Melhorias

- Implementar testes automatizados (unitários e de integração)
- Adicionar internacionalização (i18n) para suporte a múltiplos idiomas
- Melhorar acessibilidade (a11y) nas interfaces
- Criar documentação técnica dos endpoints da API
- Adicionar autenticação via OAuth/social login
- Implementar notificações em tempo real (WebSocket)
- Criar painel de relatórios para o administrador
- Otimizar performance e SEO das páginas
- Adicionar modo escuro (dark mode)
- Disponibilizar aplicativo mobile (PWA ou nativo)
