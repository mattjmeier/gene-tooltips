export default {
  title: 'Gene Tooltip JS',
  description: 'A lightweight library for creating gene information tooltips.',
  base: '/gene-tooltips/', // IMPORTANT: Set this to your repo name
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
          { text: 'Introduction', link: '/' },
          { text: 'Getting Started', link: '/guide' },
        ]
      },
      {
        text: 'Live Example',
        items: [
            { text: 'Demo Page', link: '/demo' },
        ]
      }
    ]
  }
}
