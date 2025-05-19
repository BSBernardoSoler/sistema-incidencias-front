import 'dotenv/config'
import * as joi from 'joi'

interface EnvVars {
    NEXT_PUBLIC_BACKEND: string
    NEXTAUTH_SECRET: string
    NEXTAUTH_URL: string
}

const envsSchema = joi.object({
    NEXT_PUBLIC_BACKEND: joi.string().uri().required(),
    NEXTAUTH_SECRET: joi.string().required(),
    NEXTAUTH_URL: joi.string().uri().required()
}).unknown(true)

const { error, value } = envsSchema.validate(process.env)

if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

const envVars: EnvVars = value

export const envs = {
    backend: envVars.NEXT_PUBLIC_BACKEND,
    nextAuthSecret: envVars.NEXTAUTH_SECRET,
    nextAuthUrl: envVars.NEXTAUTH_URL
}