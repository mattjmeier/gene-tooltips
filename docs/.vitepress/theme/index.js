import DefaultTheme from 'vitepress/theme'
import GeneDemo from './components/GeneDemo.vue'
import GeneDemoConfigurable from './components/GeneDemoConfigurable.vue'

export default {
  // Use the Layout from the default theme
  Layout: DefaultTheme.Layout,

  enhanceApp({ app }) {
    // Register your custom global components
    app.component('GeneDemo', GeneDemo);
    app.component('GeneDemoConfigurable', GeneDemoConfigurable);
  }
}