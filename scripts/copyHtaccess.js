import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Obtener __dirname en módulos ES
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Definir rutas
const sourceFile = path.join(__dirname, '../public/.htaccess')
const targetFile = path.join(__dirname, '../dist/.htaccess')

// Asegurarse de que el directorio dist existe
if (!fs.existsSync(path.dirname(targetFile))) {
    fs.mkdirSync(path.dirname(targetFile), { recursive: true })
}

// Copiar archivo
try {
    fs.copyFileSync(sourceFile, targetFile)
    console.log('✅ .htaccess copiado exitosamente a dist/')
} catch (error) {
    console.error('❌ Error copiando .htaccess:', error)
}