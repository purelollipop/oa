import { defineConfig } from 'umi';

export default defineConfig({
  base: '../dist/',
  publicPath: '../',
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
      // redirect:'/test',
      wrappers:['@/wrappers/auth'],
      routes:[
        // {
        //   component: '@/pages/index',
        //   // path: '/',
        //   // redirect:'/test',
        //   // wrappers:['@/wrappers/auth'],
        //   routes:[
        //     { path: '/test', component: '@/pages/test1/Test', wrappers:['@/wrappers/auth'] },
        //     { path: '/table', component: '@/pages/table/Table', wrappers:['@/wrappers/auth']  },
        //     {
        //       component: '@/pages/404',
        //     },
        //   ]
        // },
      ]
    },

  ],
  fastRefresh: {},
});
