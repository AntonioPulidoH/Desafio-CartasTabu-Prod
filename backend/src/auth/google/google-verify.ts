import { OAuth2Client } from 'google-auth-library';
import { UnauthorizedException } from '@nestjs/common';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleVerify = async (idToken: string) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        if (!payload) {
            throw new UnauthorizedException('Payload de Google no válido');
        }

        return {
            email: payload.email || '',
            name: payload.given_name || 'Usuario',
            lastName: payload.family_name || 'Google',
        };
    } catch (error) {
        throw new UnauthorizedException('Error al verificar token con Google');
    }
};