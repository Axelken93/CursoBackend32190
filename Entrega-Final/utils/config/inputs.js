import dotenv from 'dotenv'
import parseArgs from 'minimist'
import path, { join } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {alias: {m: 'mode'}, default: {mode: 'development'}}
const {mode} = parseArgs(process.argv.slice(2), config)

const env = process.env.NODE_ENV || mode
const envFile = join((__dirname), '..', '..', `.env.${env}`)

dotenv.config({
    path: envFile
})

export default {
    MongoKey: process.env.MAKEY,
    MongoUrl: process.env.MAURLMONGO,
    PORT: process.env.PORT,
    PERSISTENCE: process.env.PersistenceMode,
    MailNodemailer: process.env.MAILNODEMAILER,
    PassNodemailer: process.env.PASSNODEMAILER
}