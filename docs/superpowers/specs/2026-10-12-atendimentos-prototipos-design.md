# Protótipos da seção Atendimentos

## Objetivo

Comparar três formas de apresentar cinco ofertas com textos extensos na seção atualmente intitulada “Para mães”, mantendo a identidade visual do site e a leitura confortável em desktop e celular.

## Ajustes relacionados

- Na seção “Especialidades de atendimento”, “Mães que perderam seus bebês” passa a usar branco como os demais itens.
- O rótulo “Para mães” passa a ser “Atendimentos”.
- O título “como posso / te acompanhar” permanece.

## Conteúdo dos cinco itens

1. Como funciona o primeiro atendimento comigo.
2. Psicoterapia para mulheres tentantes e não mães.
3. Pré-Natal Psicológico.
4. Acompanhamento exclusivo para mães no pós-parto.
5. Curso Tornar-se Mãe.

Os protótipos usarão os textos completos fornecidos pela cliente, com correções de ortografia, acentuação, concordância e pontuação que não alterem o sentido.

## Ações

- Itens 1 a 4: botão “Falar no WhatsApp”.
- Item 5: botão principal “Quero conhecer o curso”.
- Item 5: botão secundário “Ver encontros e aulas bônus”.
- O botão secundário expande e recolhe duas listas: cinco encontros e seis aulas bônus.
- O controle expansível deve expor seu estado com `aria-expanded` e funcionar por teclado.

## Variações

### A. Cards editoriais — recomendada

Cada item ocupa uma linha completa. Em telas amplas, título e categoria ficam à esquerda e o conteúdo à direita; no celular, tudo se empilha. Fundo claro, cartões brancos e hierarquia tipográfica discreta.

### B. Blocos de cor alternados

Cada item ocupa uma linha completa com superfícies alternadas da paleta da marca. Mantém os textos abertos e enfatiza a separação entre ofertas, com presença visual mais forte.

### C. Divisórias sem cartões

Itens em fluxo editorial contínuo, separados por linhas e grandes intervalos. É a opção mais leve e reduz a sensação de uma sequência de caixas.

## Formato do protótipo

- Um único arquivo HTML independente e descartável.
- Três variações alternáveis por `?variant=A`, `B` ou `C`.
- Barra inferior com setas e nome da opção ativa.
- As setas do teclado também alternam as opções.
- O arquivo não altera `index.html`.

## Verificação

- Todos os textos e títulos aparecem nas três opções.
- Cada item ocupa uma linha completa em todas as variações.
- Os botões ficam visíveis e coerentes com a oferta.
- A expansão do curso funciona e mantém o estado acessível.
- Não há rolagem horizontal em 390 px e 1440 px.
