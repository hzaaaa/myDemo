import { defineMock } from 'vite-plugin-mock-dev-server'

export default defineMock({
  url: '/api/test1',
  body: {
    a:'1',
    b:'2'
  }
})