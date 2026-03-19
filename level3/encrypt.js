import bcrypt from 'bcrypt';

export async function hashPass(pass) {
    try {
        const saltRounds = 10;
        return await bcrypt.hash(pass, saltRounds);
    } catch (err) {
        throw new Error(`Error hashing password: ${err.message}`);
    }
}

export async function checkPass(pass, hashPass) {
    try {
        const match = await bcrypt.compare(pass, hashPass);
        if (!match) return false;
        return true;
    } catch (err) {
        throw new Error(`Error checking the password: ${err.message}`);
    }
}