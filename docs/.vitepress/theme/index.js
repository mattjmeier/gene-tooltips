import DefaultTheme from 'vitepress/theme'
import GeneDemo from './components/GeneDemo.vue'
// import 'd3';
// import 'ideogram';

export default {
  // Use the Layout from the default theme
  Layout: DefaultTheme.Layout,

  enhanceApp({ app }) {
    // Register custom global components
    app.component('GeneDemo', GeneDemo);
  }
}