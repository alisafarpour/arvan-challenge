export const getCookieValue = (name: string): string | null => {
    const cookies: string[] = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) {
            return value;
        }
    }
    return null;
};