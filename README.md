# Site vitrine — Psicóloga

Site estático (HTML/CSS/JS puro, sem dependências externas) para servir como vitrine profissional, com botão de WhatsApp e links para cursos em plataformas externas.

## Estrutura

```
index.html      → conteúdo e estrutura das seções
css/style.css   → estilo visual (cores, tipografia, responsivo)
js/script.js    → menu mobile e ano do rodapé
```

## O que falta preencher antes de publicar

O nome, título profissional, bio, especialidades e cursos já foram preenchidos com dados reais (extraídos de um post do Instagram @jessicagriebler). O código ainda tem comentários `<!-- TODO -->` marcando o que falta — busque por "TODO" no `index.html` para achar todos rapidamente:

- [x] **Nome da psicóloga** — Jéssica Griebler.
- [ ] **CRP** — número real do registro profissional (aparece como `CRP 00/00000` em 3 lugares: hero, e rodapé).
- [ ] **Número de WhatsApp** — troque `55XXXXXXXXXXX` (em **3 lugares**: menu, hero e botão flutuante) pelo número real no formato `55DDXXXXXXXXX` (Brasil, com DDD, sem espaços/símbolos). Exemplo: `5511998765432`.
- [x] **Texto de bio** na seção "Sobre mim" (já preenchido com a história real dela — revisar e ajustar o tom se quiser).
- [x] **Especialidades** — Pré-natal psicológico e Acompanhamento exclusivo para Mães (já preenchido).
- [ ] **Cursos** — os 3 produtos reais já estão nomeados (Capacitação "Do Pré-natal ao Puerpério", Mentoria em Pré-natal Psicológico, Mentoria Lumina); falta só trocar o `href="#"` dos botões "Acessar curso" pelos links reais de checkout (Hotmart, Udemy, Eduzz, etc.).
- [ ] **Foto real** — hoje o site usa um círculo com as iniciais "JG" como placeholder de avatar (2 lugares: hero e "Sobre mim"). Para trocar por foto real, crie uma pasta `images/` com o arquivo, e substitua `<div class="avatar-placeholder">...</div>` por `<img src="images/foto.jpg" alt="Jéssica Griebler" class="avatar-placeholder">` (ajustar CSS se quiser manter o formato circular — já há `border-radius: 50%` aplicado à classe).
- [ ] **E-mail** no rodapé (ainda `contato@example.com`).
- [x] **Instagram** no rodapé já aponta para `instagram.com/jessicagriebler`.
- [ ] **LinkedIn** no rodapé (ainda `href="#"`).

## Como testar localmente

Basta abrir o arquivo `index.html` diretamente no navegador (duplo clique) — não precisa de servidor nem instalação.

## Como publicar de graça

Qualquer uma dessas opções funciona sem custo, bastando arrastar a pasta do projeto:

- **Netlify** (drag-and-drop em [app.netlify.com/drop](https://app.netlify.com/drop))
- **Vercel** ([vercel.com](https://vercel.com))
- **GitHub Pages** (subir os arquivos para um repositório e ativar Pages nas configurações)

Depois de publicado, é só compartilhar o link — nenhuma dessas opções exige que vocês saibam programar.
