
import circleCat from './src/components/circleCat/index.vue'
import game2 from './src/components/game2/index.vue'

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
export const Routes=[
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
  {path:'/circleCat',name:"circleCat",component:circleCat},
]