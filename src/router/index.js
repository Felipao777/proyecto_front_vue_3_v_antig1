import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VistaLogin from '../views/LoginView.vue'
import AppLayout  from '@/layout/AppLayout.vue'
import Empresa from '@/views/admin/Empresa.vue'
import Trabajador_hab from '@/views/admin/Trabajador_hab.vue'
import NuevoAsmt from '@/views/admin/asmt/NuevoAsmt.vue'
import ListaAsmt from '@/views/admin/asmt/ListaAsmt.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path: '/login',
      //name: 'home',
      name:'login',
      component: VistaLogin,
      meta: { redirectIfAuth: true }
    },
    {
      path: '/',
      component: AppLayout,
      children: [

        {
          path: '/',
          name: 'home',
          component: HomeView,
          meta: { requireAuth: true }
        },

        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/AboutView.vue'),
          meta: { requireAuth: true }
        },
        {
          path:'empresa',
          name: 'Empresa',
          component:Empresa,
          meta: { requireAuth: true },
          //meta: { redirectIfAuth: true }
        },
        {
          path:'trabajador',
          name: 'Trabajador',
          component:Trabajador_hab,
          meta: { requireAuth: true },
          //meta: { redirectIfAuth: true }
        },
        {
          path:'asmt/nuevo',
          name: 'AsmtNuevo',
          component:NuevoAsmt,
          meta: { requireAuth: true },
          //meta: { redirectIfAuth: true }
        },
        {
          path:'asmt',
          name: 'AsmtLista',
          component:ListaAsmt,
          meta: { requireAuth: true },
          //meta: { redirectIfAuth: true }
        }

      ]
    }
  ]
})
// Guard guardia de seguridad para protejer las rutas seria un middleware

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("access_token")
  //console.log(to)   lo borramos xq esta mostrando mucha inform de rutas 
  if (to.meta.requireAuth) {
    if (!token)
      return next({ name: 'login' });
    return next()
  }

  if (to.meta.redirectIfAuth && token) {
    return next({ name: 'about'})
  }

  return next()
})


export default router
