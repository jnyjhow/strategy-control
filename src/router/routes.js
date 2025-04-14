const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/TransctionPage.vue') },
      {
        path: '/contracts',
        // component: () => import('layouts/ContractLayout.vue'), // (opcional)
        children: [
          {
            path: '',
            name: 'contracts',
            component: () => import('pages/Contracts/ContractsPage.vue'),
          },
          {
            path: 'logic',
            name: 'contracts.logic',
            component: () => import('pages/Contracts/ContractLogicPage.vue'),
          },
          {
            path: 'dividends',
            name: 'contracts.dividends',
            component: () => import('pages/Contracts/DividendLogicPage.vue'),
          },
        ],
      },
      {
        path: '/dataManagement',
        // component: () => import('layouts/ContractLayout.vue'), // (opcional)
        children: [
          {
            path: '',
            name: 'Clientes',
            component: () => import('pages/DataManagement/ClientsPage.vue'),
          },
          {
            path: 'assessores',
            name: 'Assessores',
            component: () => import('pages/DataManagement/AdvisorsPage.vue'),
          },
          {
            path: 'leads',
            name: 'Leads',
            component: () => import('pages/DataManagement/LeadPage.vue'),
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
