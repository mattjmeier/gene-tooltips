import DefaultTheme from 'vitepress/theme'
import GeneDemo from './components/GeneDemo.vue'
import GeneDemoConfigurable from './components/GeneDemoConfigurable.vue'
import GeneDemoCommaDelimited from './components/GeneDemoCommaDelimited.vue'
//import GeneDemoSpaceDelimited from './components/GeneDemoSpaceDelimited.vue'
//import GeneDemoSemicolonDelimited from './components/GeneDemoSemicolonDelimited.vue'

export default {
  // Use the Layout from the default theme
  Layout: DefaultTheme.Layout,

  enhanceApp({ app }) {
    // Register custom global components
    app.component('GeneDemo', GeneDemo);
    app.component('GeneDemoConfigurable', GeneDemoConfigurable);
    app.component('GeneDemoCommaDelimited', GeneDemoCommaDelimited);
    //app.component('GeneDemoSpaceDelimited', GeneDemoSpaceDelimited);
    //app.component('GeneDemoSemicolonDelimited', GeneDemoSemicolonDelimited);
  }
}