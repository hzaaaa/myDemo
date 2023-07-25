import { defineMock } from 'vite-plugin-mock-dev-server'

export default defineMock({
  url: '/api/count',
  body: {
    data:1
  }
})