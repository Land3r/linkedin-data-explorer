const routes = [
  {
    path: '/view',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'connections',
        name: 'ConnectionsPage',
        component: () => import('pages/view/ConnectionsPage.vue')
      }
      // {
      //   path: 'contacts',
      //   name: 'ContactsPage',
      //   component: () => import('pages/view/ContactsPage.vue')
      // },
      // {
      //   path: 'invitations',
      //   name: 'InvitationsPage',
      //   component: () => import('pages/view/InvitationsPage.vue')
      // },
      // {
      //   path: 'messages',
      //   name: 'MessagesPage',
      //   component: () => import('pages/view/MessagesPage.vue')
      // },
      // {
      //   path: 'profile',
      //   name: 'ProfilePage',
      //   component: () => import('pages/view/ProfilePage.vue')
      // },
      // {
      //   path: 'recommendations/given',
      //   name: 'RecommendationsGivenPage',
      //   component: () => import('pages/view/RecommendationsGivenPage.vue')
      // },
      // {
      //   path: 'recommendations/received',
      //   name: 'RecommendationsReceivedPage',
      //   component: () => import('pages/view/RecommendationsReceivedPage.vue')
      // },
      // {
      //   path: 'registrations',
      //   name: 'RegistrationsPage',
      //   component: () => import('pages/view/RegistrationsPage.vue')
      // }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'HomePage',
        component: () => import('pages/Index.vue')
      },
      { path: 'upload', component: () => import('pages/Upload.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
