import GeneDemo from './components/GeneDemo.vue'

export default {
  // Use the Layout from the default theme
  Layout: DefaultTheme.Layout,

  enhanceApp({ app }) {
    // Register your custom global components
    app.component('GeneDemo', GeneDemo);
  }
}