### 🦷 OdontoExpert Mobile

Aplicativo mobile para gestão de casos de Odontologia Legal. Desenvolvido em React Native com Expo Router e integração com contexto de autenticação.

---

### Tecnologias utilizadas

* [React Native](https://reactnative.dev/)
* [Expo](https://expo.dev/)
* [Expo Go](https://expo.dev/client)
* [TypeScript](https://www.typescriptlang.org/)
* [expo-router](https://expo.github.io/router/)
* [React Context API](https://reactjs.org/docs/context.html)
* [Axios](https://axios-http.com/)
* [Cloudinary](https://cloudinary.com/)

---

### Estrutura de pastas

```
/odx-mobile
├── app/                  # Rotas do aplicativo (expo-router)
│   ├── (tabs)/           # Navegação por abas
│   ├── login.tsx         # Tela de login
│   ├── User/             # Tela do usuário
│   └── _layout.tsx       # Layout root com AuthProvider
├── assets/               # Imagens e fontes
├── components/           # Componentes reutilizáveis
├── contexts/             
│   └── AuthContext.tsx   # Contexto de autenticação
├── services/             
│   └── api.ts            # Instância do Axios
├── utils/                # Funções auxiliares
├── tsconfig.json
└── package.json
```

---

###  Instalação e uso

1. **Clone o repositório**

```bash
git clone https://github.com/rafaellamarquess/odx-mobile.git
cd odx-mobile
```

2. **Instale as dependências**

```bash
npm install
# ou
yarn install
```

3. **Corrija as versões se necessário**

Se houver conflitos de versão com `expo-router`, atualize os pacotes com:

```bash
npx expo install
```

4. **Inicie o projeto com Expo Go**

```bash
npm start
```

> Abra no navegador ou escaneie o QR Code com o app **Expo Go** no seu celular (Android ou iOS).

---

### 🛠 Scripts úteis

```bash
# iniciar o servidor Expo
npx expo start

# limpar cache
npx expo start -c
```
