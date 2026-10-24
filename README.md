# Notícias de São José do Calçado

Bloco em estilo jornal para exibir notícias sobre **São José do Calçado/ES**. Atualiza às **08:00, 12:00 e 17:00** (America/Sao_Paulo), filtra duplicadas, busca em Google News + Bing News + jornais capixabas. Exibe apenas notícias do ano atual por padrão, com filtro por ano, contador de visitas e campo "Deixe sua opinião".

## Pasta
`C:\Users\luiz\Documents\noticias calcado`

Versão para ajustes: `C:\Users\luiz\Documents\noticias calcado - LOCAL AJUSTES`

## Rodar servidor
```bash
node src/server.js
```
Abrir: http://localhost:8080

## Atualizar notícias
```bash
node src/updater.js
```

## Como funciona
- Coleta de RSS/feeds com filtro por "São José do Calçado"
- Deduplicação por ID (hash do link)
- Não repete notícias já vistas
- Exibe por padrão apenas notícias do ano atual
- Imagem no canto superior esquerdo do cabeçalho
- Imagem ao lado da notícia somente se encontrada
- Ao clicar, abre a matéria no site original (celular/desktop)
- Contador de visitas
- Campo "Deixe sua opinião" salvo em `data/opinioes.json`

## Agendar automático (08h/12h/17h)
Você pode usar o Agendador de Tarefas do Windows (Task Scheduler) apontando para:
```text
C:\Program Files\nodejs\node.exe
```
com argumento:
```text
src\updater.js
```
e diretório inicial:
```text
C:\Users\luiz\Documents\noticias calcado
```
Agende para 08:00, 12:00 e 17:00 todos os dias.
