import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

let plugins = []

if(!process.env.PROD){
  plugins.push(basicSsl())
}

plugins.push(react())

// https://vitejs.dev/config/
export default defineConfig({
  plugins
})
