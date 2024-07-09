require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database/database');

class User {
    static findAllUser(callback) {
        const sql = 'SELECT * FROM users';
        db.all(sql, [], (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(null, rows);
        });
    }

    static updateToken(username, token) {
        const sql = 'UPDATE users SET token = ? WHERE username = ?';
        db.run(sql, [token, username]);
    }

    static generateNewToken(user) {
        const secretKey = process.env.JWT_SECRET || 'chave_secreta';
        return jwt.sign({ id: user.id, username: user.username }, secretKey, {
            expiresIn: '1h', // Token expira em 1 hora
        });
    }

    static verifyToken(token) {
        const secretKey = process.env.JWT_SECRET || 'chave_secreta';
        return new Promise((resolve, reject) => {
            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });
    }

    static register(username, password, callback) {
        const hashedPassword = bcrypt.hashSync(password, 8);

        // Verifica se o usuário já existe
        db.get('SELECT * FROM users WHERE username = ?', [username], (err, existingUser) => {
            if (err) {
                return callback(new Error(err.message)); // Retorna um erro se houver um erro na consulta
            }

            if (existingUser) {
                return callback(new Error('Username already exists')); // Retorna um erro se o usuário já existir
            }

            // Insere o novo usuário no banco de dados
            const token = this.generateNewToken({ username }); // Gera um token para o usuário
            db.run('INSERT INTO users (username, password, token) VALUES (?, ?, ?)', [username, hashedPassword, token], function (err) {
                if (err) {
                    return callback(new Error(err.message)); // Retorna um erro se houver um erro na inserção
                }
                callback(null, { auth: true, token }); // Retorna sucesso com o token gerado
            });
        });
    };

    static login(username, password, existingToken) {
        return new Promise(async (resolve, reject) => {
            if (existingToken) {
                try {
                    const decoded = await User.verifyToken(existingToken);
                    // Token válido, retornar dados do usuário
                    const sql = 'SELECT * FROM users WHERE id = ?';
                    db.get(sql, [decoded.id], (err, row) => {
                        if (err) {
                            reject(err);
                        } else if (row) {
                            resolve({ token: existingToken, user: row });
                        } else {
                            reject(new Error('Usuário não encontrado'));
                        }
                    });
                } catch (err) {
                    if (err.name === 'TokenExpiredError') {
                        // Token expirado, pedir para validar novamente
                        reject(new Error('Token expirado, faça login novamente'));
                    } else {
                        reject(new Error('Token inválido'));
                    }
                }
            } else {
                // Token não presente, verificar credenciais do usuário
                const sql = 'SELECT * FROM users WHERE username = ?';
                db.get(sql, [username], async (err, row) => {
                    if (err) {
                        reject(err);
                    } else if (row) {
                        try {
                            const passwordMatch = await bcrypt.compare(password, row.password);
                            if (!passwordMatch) {
                                reject(new Error('Usuário ou senha inválidos'));
                            } else {
                                // Gerar novo token
                                const newToken = User.generateNewToken(row);
                                this.updateToken(username, newToken);
                                row.token = newToken
                                resolve({ token: newToken, user: row });
                            }
                        } catch (compareErr) {
                            reject(compareErr);
                        }
                    } else {
                        reject(new Error('Credenciais inválidas'));
                    }
                });
            }
        });
    }
}


module.exports = User;