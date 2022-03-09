import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/login',
      component: '@/pages/login/Login',
    },
    {
      path: '/',
      component: '@/layouts/index',
      wrappers:['@/wrappers/auth'],
      routes:[
        {
          component: '@/pages/index',
          routes:[
            { path: '/test', component: '@/pages/test1/Test', wrappers:['@/wrappers/auth'] },
            { path: '/table', component: '@/pages/table/Table', wrappers:['@/wrappers/auth']  },
            { path: '/ShowMessage', component: '@/pages/message/index',wrappers:['@/wrappers/auth']},
            { path: '/setting', component: '@/pages/setting/setting',wrappers:['@/wrappers/auth']},
            {component: '@/pages/404',},
          ]
        },
      ]
    },

  ],
  fastRefresh: {},
  dynamicImportSyntax: {},
  dynamicImport: {},
});
