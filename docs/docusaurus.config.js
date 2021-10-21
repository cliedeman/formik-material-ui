module.exports = {
  title: 'Formik Material-UI',
  tagline: 'Easily combine formik with MUI',
  url: 'https://stackworx.github.io/',
  baseUrl: '/formik-mui/',
  favicon: 'img/favicon.ico',
  organizationName: 'stackworx',
  projectName: 'formik-mui',
  themeConfig: {
    navbar: {
      title: 'Formik Material-UI',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        { to: 'docs/guide/getting-started', label: 'Guide', position: 'left' },
        { to: 'docs/api/material-ui', label: 'API', position: 'left' },
        // { to: 'blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/stackworx/formik-mui',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Ciaran Liedeman, Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/stackworx/formik-mui/edit/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
