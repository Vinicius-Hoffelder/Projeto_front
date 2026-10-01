# Vitrine — catálogo mobile

Aplicativo acadêmico em React Native, Expo SDK 57 e JavaScript, com axios e React Navigation. Interface para Android e iOS com áreas seguras, formulário adaptado ao teclado e rolagem.

## Integrante

| Nome completo | RA 
| Vinicius Hoffelder | 1137833
| Eduardo Barreda | 1138704
| Joao Buratti |  1136821
| Victor Quadri | 1136643

## Executar no celular

1. Instale Node.js 22.13 ou superior e Expo Go compatível com SDK 57.
2. Abra o terminal nesta pasta e execute `npm ci`.
3. Execute `npm start`.
4. Mantenha computador e celular na mesma rede Wi-Fi.
5. No Android, leia o QR code pelo Expo Go. No iPhone, use a câmera.

Se a rede bloquear a conexão local, tente `npx expo start --tunnel`. O aplicativo precisa de internet para consultar a API e carregar imagens. Emuladores configurados podem ser abertos com `npm run android` ou `npm run ios` (iOS requer macOS).

## Contas para login

Abra https://fakestoreapi.com/users e consulte os campos `username` e `password` de um usuário existente. Use os valores exatamente como aparecem. O e-mail acadêmico identifica o integrante do trabalho, não uma conta da API.

O app consulta GET /users, verifica as credenciais e solicita o token em POST /auth/login. A sessão fica somente na memória e termina ao fechar o app ou sair. Não existe cadastro local nem autenticação simulada.

## Funcionalidades

- FlatList com imagem real, nome e preço.
- Todas as categorias inicialmente; filtros via GET /products/category/{categoria} e opção para limpar.
- Detalhes via GET /products/{id}, com imagem, título, categoria, descrição e preço reais.
- ActivityIndicator durante consultas, mensagens de erro e novas tentativas.
- Header com logout à esquerda, Produtos ao centro e informações à direita.
- Logout remove a sessão e as rotas autenticadas, inclusive ao usar voltar.
- Informações do grupo com nome completo e RA.

Os valores numéricos são preservados e formatados em reais, conforme o exemplo do enunciado. Não há conversão cambial nem multiplicação. Títulos e descrições permanecem no idioma retornado pela API. As categorias têm rótulos em português.

## Verificação

```sh
npm run lint
npm run typecheck
npm test
npx expo export --platform android --platform ios
```

O typecheck analisa JavaScript; o aplicativo não foi convertido para TypeScript. Os testes usam respostas controladas. A validação final de uso deve ser feita em um celular com Expo Go e acesso à Fake Store API.

## Estrutura

- src/pages: Login, Home, DetalheProduto e InformacoesGrupo.
- src/services/api.js: axios, validações e mensagens de erro.
- src/context/AuthContext.js: sessão e logout.
- src/hooks/useApi.js: carregamento, erros e cancelamento de consultas antigas.
- src/routes/routes.js: Stack Navigation.
- src/data/grupo.js: identificação do integrante.
