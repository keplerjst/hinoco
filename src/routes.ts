import * as homeRoute from './app/routes/home'
import * as aboutRoute from './app/routes/about'

export const routes = [
  { path: '/', ...homeRoute },
  { path: '/about', ...aboutRoute },
] as const
