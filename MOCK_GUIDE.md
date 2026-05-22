# Painel Administrativo - Guia de Uso com Dados Mock

## 🎭 Modo Mock Ativado

O sistema está configurado para usar dados mock simulados, permitindo testar toda a funcionalidade sem precisar de um backend real.

## 👤 Usuários de Teste

### Login como Administrador
- **Email:** admin@ecommerce.com
- **Senha:** qualquer senha
- **Permissões:** Acesso total (usuários, pedidos, dashboard)

### Login como Gerente
- **Email:** gerente@ecommerce.com
- **Senha:** qualquer senha
- **Permissões:** Gerenciamento de pedidos

### Login como Visualizador
- **Email:** maria@example.com
- **Senha:** qualquer senha
- **Permissões:** Visualização apenas

### Usuários Inativos (para testar ativação)
- **Email:** joao@example.com - Regular User (inativo)
- **Email:** pedro@example.com - Sem função (inativo)

## 📦 Dados Disponíveis

### Pedidos Mock
- **6 pedidos** com diferentes status
- Status variados: Aguardando Pagamento, Pago, Em Transporte, Entregue, Cancelado
- Histórico completo de alterações de status
- Anexos (notas fiscais e comprovantes)

### Fluxo de Teste Completo

#### 1. Registro e Ativação de Usuário
```
1. Acesse /register
2. Registre um novo usuário (qualquer email válido)
3. Tente fazer login → Verá mensagem de conta inativa
4. Faça login como admin (admin@ecommerce.com)
5. Vá em Usuários
6. Ative o usuário recém-criado
7. Atribua uma função (role)
8. Faça logout e login com o novo usuário
```

#### 2. Dashboard
```
1. Faça login como admin
2. Veja os totalizadores de pedidos por status
3. Observe o total de pedidos e receita
```

#### 3. Gerenciamento de Pedidos
```
1. Acesse "Pedidos" no menu
2. Teste os filtros:
   - Por status
   - Por nome do cliente
   - Por intervalo de datas
3. Clique em um pedido para ver detalhes
```

#### 4. Atualização de Status
```
1. Entre em um pedido
2. Clique em "Atualizar Status"
3. Escolha um novo status
4. Adicione observações (opcional)
5. Veja a mensagem de email simulado no console
6. Observe o histórico atualizado
```

#### 5. Upload de Anexos
```
1. Entre em um pedido
2. Na seção "Anexos", clique para fazer upload
3. Selecione um arquivo PDF, JPG ou PNG
4. Veja o arquivo aparecer na lista
5. Clique em visualizar (para PDFs) ou baixar
```

#### 6. Gerenciamento de Usuários (Admin)
```
1. Faça login como admin
2. Acesse "Usuários"
3. Veja a lista de usuários
4. Use os filtros (ativo/inativo)
5. Ative/desative usuários com o switch
6. Clique no ícone de editar para mudar a função
```

## 🔄 Comportamento Mock

### O que funciona:
- ✅ Login e registro
- ✅ Verificação de usuário ativo/inativo
- ✅ Dashboard com estatísticas reais dos dados mock
- ✅ Listagem de pedidos com filtros
- ✅ Detalhes completos do pedido
- ✅ Atualização de status (com log de email no console)
- ✅ Histórico de alterações de status
- ✅ Upload de arquivos (simulado)
- ✅ Listagem de anexos
- ✅ Gerenciamento de usuários
- ✅ Ativação de usuários
- ✅ Atribuição de roles

### Comportamento Especial:
- 📧 **Emails**: Ao atualizar status de pedido, uma mensagem é exibida no console do navegador simulando o envio de email
- 📁 **Arquivos**: Upload é simulado - o arquivo não é realmente armazenado
- 💾 **Dados**: Alterações persistem durante a sessão (recarregar a página reseta os dados)

## 🧪 Cenários de Teste

### Cenário 1: Novo Usuário
```
1. Registre usuário com email novo
2. Tente login → Verá "conta inativa"
3. Login como admin
4. Ative o usuário e atribua função
5. Login com o novo usuário → Sucesso
```

### Cenário 2: Fluxo Completo de Pedido
```
1. Veja pedido "Aguardando Pagamento"
2. Mude status para "Pago"
3. Anexe comprovante de pagamento
4. Mude status para "Em Transporte"
5. Anexe nota fiscal
6. Veja histórico completo
7. Observe emails simulados no console
```

### Cenário 3: Controle de Acesso
```
1. Login como usuário não-admin
2. Tente acessar /users → Bloqueado
3. Acesse /orders → Permitido
4. Acesse /dashboard → Permitido
```

## 🔧 Configuração

### Ativar/Desativar Mock

Edite `.env.development`:
```env
# true = usa dados mock
# false = tenta conectar com backend real
VITE_USE_MOCK=true
```

### Ver Logs Mock

Abra o Console do navegador (F12) e veja:
- `🎭 Mock API: GET /api/...` - Requisições interceptadas
- `📧 Email enviado para...` - Simulação de emails

## 📊 Dados Detalhados

### Pedidos Disponíveis:
1. **ORD-2026-00001** - R$ 3.850,00 - ENTREGUE - Com 2 anexos
2. **ORD-2026-00002** - R$ 7.500,00 - EM_TRANSPORTE - Com 1 anexo
3. **ORD-2026-00003** - R$ 4.000,00 - PAGO - Sem anexos
4. **ORD-2026-00004** - R$ 1.800,00 - AGUARDANDO_PAGAMENTO
5. **ORD-2026-00005** - R$ 5.100,00 - CANCELADO
6. **ORD-2026-00006** - R$ 9.500,00 - PAGO

### Usuários Disponíveis:
- 5 usuários com diferentes roles e status
- 2 usuários ativos (admin e gerente)
- 1 usuário viewer ativo
- 2 usuários inativos para testar ativação

## 🚀 Como Começar

```bash
# 1. Instale as dependências (se ainda não fez)
npm install

# 2. Inicie o servidor de desenvolvimento
npm run dev

# 3. Acesse http://localhost:5173

# 4. Faça login com:
#    Email: admin@ecommerce.com
#    Senha: qualquer coisa

# 5. Explore todas as funcionalidades!
```

## 💡 Dicas

- Use o console do navegador para ver as requisições mock
- Emails simulados aparecem no console quando você atualiza status
- Os dados resetam ao recarregar a página
- Para testar erros, você pode modificar o código do mock
- Filtros e buscas funcionam com os dados mock

## 🔄 Migração para Backend Real

Quando o backend estiver pronto:

1. Configure `.env.development`:
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_USE_MOCK=false
```

2. Todos os endpoints já estão documentados em `untitled:plan-ecommerceAdminPanel.prompt.md`

3. A API real deve seguir o mesmo formato de resposta dos mocks
