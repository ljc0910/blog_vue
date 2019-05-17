import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import edit from '@/views/edit'
import demo from '@/views/demo'
import timeline from '@/views/timeline'
import admin from '@/views/admin'
import detail from '@/components/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children:[{
        path: 'detail',
        name: 'detail',
        component: detail,
      }]
    },{
      path:'/edit',
      name:'edit',
      component:edit
    },{
      path:'/timeline',
      name:'timeline',
      component:timeline
    },{
      path:'/admin',
      name:'admin',
      component:admin
    },{
      path:'/demo',
      name:'demo',
      component:demo
    }
  ]
})
