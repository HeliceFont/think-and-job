import bcrypt from 'bcryptjs'

const users = [
    {
        id: 1,
        email: 'admin@test.com',
        // Guardamos el hash en lugar de la contraseña en texto plano
        password: bcrypt.hashSync('admin123', 10),
        role: 'admin',
        name: 'Admin User'
    },
    {
        id: 2,
        email: 'supermaster@test.com',
        password: bcrypt.hashSync('supermaster123', 10),
        role: 'supermaster',
        name: 'supermaster User'
    },
    {
        id: 3,
        email: 'master@test.com',
        password: bcrypt.hashSync('master123', 10),
        role: 'master',
        name: 'master User'
    },
    {
        id: 4,
        email: 'encargado@test.com',
        password: bcrypt.hashSync('encargado123', 10),
        role: 'encargado',
        name: 'encargado User'
    },
    {
        id: 5,
        email: 'colaborador@test.com',
        password: bcrypt.hashSync('colaborador123', 10),
        role: 'colaborador',
        name: 'colaborador User'
    },
    {
        id: 6,
        email: 'candidato@test.com',
        password: bcrypt.hashSync('candidato123', 10),
        role: 'candidato',
        name: 'candidato User'
    },
    
    
]

export const fakeAuthService = async ({ email, password }) => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const user = users.find(u => u.email === email)
    
    if (!user) {
        throw new Error('Usuario no encontrado')
    }

    // Debug logs
    console.log('Debug password:', {
        providedPassword: password,
        storedHash: user.password,
        isMatch: bcrypt.compareSync(password, user.password)
    })

    // Comparar contraseña
    const isValidPassword = bcrypt.compareSync(password, user.password)
    if (!isValidPassword) {
        throw new Error('Contraseña incorrecta')
    }

    return {
        user: {
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.name
        },
        token: `fake-jwt-token-${user.role}`
    }
}
