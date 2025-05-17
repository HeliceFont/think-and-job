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
        email: 'manager@test.com',
        password: bcrypt.hashSync('manager123', 10),
        role: 'manager',
        name: 'Manager User'
    },
    {
        id: 3,
        email: 'employee@test.com',
        password: bcrypt.hashSync('employee123', 10),
        role: 'employee',
        name: 'Employee User'
    }
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
