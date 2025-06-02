module.exports = {
  content: [
    './app/**/*.{ts,tsx}',  // Inclui todos os arquivos TypeScript no diretório 'app'
    './components/**/*.{ts,tsx}', // Inclui todos os arquivos TypeScript no diretório 'components'
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#679AA3', // Adiciona uma cor personalizada usada no projeto
        'custom-gray': '#6C7483',
        'custom-dark': '#3A5F65',
      },
    },
  },
  plugins: [],
};