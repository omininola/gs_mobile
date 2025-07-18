# GS - Protech The Future | Mobile

## Integrantes

| Nome                   |   RM   |
| :--------------------- | :----: |
| Otavio Miklos Nogueira | 554513 |
| Luciayla Yumi Kawakami | 557987 |

## Links

- Youtube: https://youtu.be/slLYw0AFKmQ

## Descrição 

Desenvolvemos um aplicativo mobile em React Native voltado para o relato e monitoramento de incêndios e queimadas. O sistema permite que usuários façam cadastro, login e publiquem relatórios de ocorrências, com possibilidade de filtrar por cidade ou visualizar apenas seus próprios relatos.

Além disso, o app conta com um dashboard em tempo real, alimentado por dados do ThingSpeak, onde gráficos mostram informações captadas por sensores embarcados em drones que sobrevoam áreas críticas. Esses drones são capazes de gerar relatórios automáticos, otimizando a identificação e resposta a desastres ambientais.

A aplicação consome uma REST API desenvolvida com Spring Boot, que se comunica com um banco de dados Oracle contendo tabelas interligadas como: Usuários, Relatórios, Drones, Sensores, Cidades, Estados e Países.

Combinando dados manuais e automáticos, o sistema visa acelerar a detecção de incêndios e fornecer informações valiosas para tomada de decisão por autoridades e cidadãos.

---

## Instruções

### Instalação

1. Clone o repositório do projeto:
   1. HTTPS: `git clone https://github.com/omininola/gs_mobile.git`
   2. SSH: `git@github.com:omininola/gs_mobile.git`
2. Entre no diretório do projeto: `cd gs_mobile`
3. Instale as dependências: `npm install`

### Incialização

#### Rode o projeto: `npm start`

**A resposta da API de Java pode demorar devido ao deploy gratuito na plataforma Render**

##### Caso tenha um Emulador Android

1. Vá no terminal e pressione `a` para inicializar o emulador

##### Caso não tenha um Emulador Android

1. Instale o Expo Go no seu celular
   1. Android: https://play.google.com/store/apps/details?id=host.exp.exponent
   2. IOS: https://apps.apple.com/br/app/expo-go/id982107779
2. Volte no terminal e pressione `s` para mudar de "development build" para "Expo Go"
3. Leia o QR Code com a câmera do seu celular

### Navegação

O aplicativo possui várias funcionalidades, logo de cara você pode acessar a tela de `Dashboard` para verificar a situação dos nossos sensores que estão acoplados aos drones que detectam fogo.

Aleḿ disso, você pode criar uma nova conta caso não tenha uma, ou entrar em uma conta já existente. Isso te garante acesso as demais páginas, como a de usuário, relatórios e criação de novos relatórios.

Aqui estão algumas imagens que representam essas telas

#### Home

![Tela de Entrada](assets/home.jpg)

#### Cadastro

![Tela de Cadastro](assets/register.jpg)

#### Login

![Tela de Login](assets/login.jpg)

#### Usuário

![Tela do Usuário](assets/user.jpg)

#### Relatórios

![Tela dos Relatórios](assets/relatorios.jpg)

#### Criar Relatório

![Tela de Criar Relatórios](assets/criar_relatorio.jpg)
