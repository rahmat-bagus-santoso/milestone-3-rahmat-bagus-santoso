import { getSession } from './auth';
import { AUTH_COOKIE } from './auth-types';
import { cookies } from 'next/headers';

jest.mock('next/headers', () => ({
    cookies: jest.fn()
}));

describe(' Auth getSession', () => {
    test('should return null if no cookie is set', async () => {
        (cookies as jest.Mock).mockResolvedValue({
            get: () => null
        });
        const session = await getSession();
        expect(session).toBeNull();
    });
});

test('should return null if no cookie is set', async () => {
    const mockUser = {
        id: 1,
        email: 'test@mail.com',
    };
    (cookies as jest.Mock).mockResolvedValue({
        get: () => ({value:JSON.stringify(mockUser)}),
    });
    const session = await getSession();
    expect(session).toEqual(mockUser);
});

