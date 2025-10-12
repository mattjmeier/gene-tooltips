export default {
  title: 'Gene Tooltip JS',
  description: 'A lightweight library for creating gene information tooltips.',
  base: '/gene-tooltips/',
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }]
  ],
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide' },
      { text: 'Demo', link: '/demo' },
      { text: 'GitHub', link: 'https://github.com/mattjmeier/gene-tooltips' }
    ],
    sidebar: [
      {
        text: 'Documentation',
        items: [
          { text: 'Getting started', link: '/guide' },
          { text: 'Advanced configuration', link: '/configuration.md'},
          { text: 'Integration with various frameworks', link: '/integration.md'},
          { text: 'Adding new sections to tooltips', link: '/add-modules.md'} 
        ]
      },
      {
        text: 'Live Example',
        items: [
            { text: 'Demo Page', link: '/demo' },
        ]
      },
      {
        text: "API Reference",
        items: [
          { text: "Description of props", link: '/api.md'},
          { text: "Full API", link: '/api/modules'}
        ]
      }
    ]
  }
}
