
const { User } = require('./model')

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findByPk(userId)
        
        if (!user) {
            res.status(404).send('User not found')
        } else {
            res.json(user)
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

exports.createUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!password || !email) {
            return res.status(400).json({ error: 'Wszystkie pola są wymagane' });
        }

        const user = await User.create({
            email,
            password
        })

        res.status(201).json({ user });

    } catch (error) {
        console.error('Blad przy rejestracji uzytkownika: ', error.message);

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                error: error.errors.map(e => e.message)
            });
        }

        res.status(500).send('Błąd przy rejestracji.');
    }
}
