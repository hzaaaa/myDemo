import { defineMock } from 'vite-plugin-mock-dev-server'

export default defineMock({
  url: '/api/test2',
  body: {
    a:'2',
    b:'1'
  }
})