export const validators = {
  email: (value: string): string | undefined => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return 'Email é obrigatório';
    if (!emailRegex.test(value)) return 'Email inválido';
    return undefined;
  },

  required: (value: string): string | undefined => {
    if (!value || value.trim() === '') return 'Campo obrigatório';
    return undefined;
  },

  minLength: (min: number) => (value: string): string | undefined => {
    if (!value || value.length < min) return `Mínimo de ${min} caracteres`;
    return undefined;
  },

  password: (value: string): string | undefined => {
    if (!value) return 'Senha é obrigatória';
    if (value.length < 6) return 'A senha deve ter no mínimo 6 caracteres';
    return undefined;
  },

  phone: (value: string): string | undefined => {
    if (!value) return undefined; // Optional
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(value)) return 'Telefone inválido';
    return undefined;
  },
};
