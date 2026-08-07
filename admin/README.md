# Sistema de Atendimentos (área privada)

Ferramenta privada para cadastrar pacientes, lançar atendimentos e consultar valores a receber e despesas. Separada do site vitrine público — não tem nenhum link a partir dele.

## Estrutura

```
admin/
├── index.html          → tela de login
├── dashboard.html       → totais e resumo mensal
├── pacientes.html        → cadastro de pacientes
├── atendimentos.html    → lançar/listar atendimentos
├── receber.html          → valores a receber (filtro por paciente/tipo)
├── despesas.html         → cadastro de despesas
├── css/admin.css
├── js/
│   ├── supabaseClient.js → configuração de conexão (preencher, ver passo 1)
│   ├── auth.js
│   ├── format.js
│   └── ...
└── serve.ps1             → servidor local só para testar (porta 8081)

supabase/
├── schema.sql             → cria as tabelas e permissões
└── import_historico.sql   → importa os 213 atendimentos reais (Jan–Jul/2026) da planilha antiga
```

## Passo 1 — Criar o projeto no Supabase (gratuito)

1. Crie uma conta em [supabase.com](https://supabase.com) e clique em "New Project".
2. Anote a senha do banco que você definir (não precisa mais depois, mas guarde por segurança).
3. Quando o projeto terminar de criar, vá em **Project Settings → API** e copie:
   - **Project URL**
   - **anon public key**
4. Abra `admin/js/supabaseClient.js` e cole esses dois valores no lugar de `COLE_AQUI_...`.

> A "anon key" pode ficar visível no código do navegador sem problema — é assim que o Supabase funciona. Quem realmente protege os dados são as regras de acesso (RLS) já configuradas em `schema.sql` (só usuário logado consegue ler/escrever).

## Passo 2 — Criar as tabelas

1. No painel do Supabase, abra **SQL Editor**.
2. Cole o conteúdo de `supabase/schema.sql` e rode ("Run"). Isso cria as tabelas de pacientes, atendimentos, despesas e os tipos de cobrança iniciais (Particular, Pacote).

## Passo 3 — Importar o histórico da planilha (opcional, uma vez só)

1. Ainda no SQL Editor, cole o conteúdo de `supabase/import_historico.sql` e rode.
2. Isso cadastra os 26 pacientes já identificados na planilha antiga e lança os 213 atendimentos reais de Janeiro a Julho de 2026.
3. **Rode só uma vez** — rodar de novo duplicaria os pacientes e atendimentos.

## Passo 4 — Criar os logins

1. No painel do Supabase, vá em **Authentication → Users → Add user**.
2. Crie um usuário para cada pessoa que vai acessar (recomendado: 2 — a psicóloga e você), com e-mail e senha. Marque "Auto Confirm User" para não precisar de confirmação por e-mail.

## Como testar localmente

1. Na pasta `admin/`, clique com o botão direito em `serve.ps1` → "Executar com PowerShell" (ou rode `.\serve.ps1` num terminal PowerShell dentro da pasta).
2. O navegador abre em `http://localhost:8081`. Faça login com um dos usuários criados no Passo 4.
3. Roteiro de teste sugerido: cadastrar um paciente → lançar um atendimento pendente → marcar como pago → conferir se os totais do dashboard mudaram → filtrar "A Receber" por paciente e por tipo de cobrança → cadastrar uma despesa.

## Como publicar

Igual ao site principal — sem custo, sem precisar programar:

1. Suba a pasta `admin/` (só ela, não o repositório inteiro) para o [Netlify Drop](https://app.netlify.com/drop) ou crie um novo projeto na Vercel apontando para a subpasta `admin/`.
2. Você recebe uma URL própria (ex. `algumnome.netlify.app`), diferente da URL do site público — não compartilhe esse link publicamente.
3. Sugestão: abra essa URL no celular dela e use "Adicionar à tela inicial" para funcionar como um appzinho.

## O que não está incluso nesta primeira versão

- Mais de 2 usuários / permissões diferentes por usuário.
- Outros tipos de cobrança além de "Particular" e "Pacote" (dá pra cadastrar novos direto na tabela `payment_methods` pelo painel do Supabase, se precisar antes de uma tela própria existir).
- Emissão de recibo, lembrete por WhatsApp, exportação de relatórios.
