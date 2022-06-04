export default {
  pt: {
    signUp: {
      title: 'Vamos começar',
      subtitle:
        'Crie uma conta no eSoja para ter acesso á todas as funcionalidades',
      imagePlaceholder: 'Adicionar imagem',
      imageUpdatePictureLabel: 'Alterar imagem',
      name: 'Nome',
      namePlaceholder: 'Digite um nome para o talhão',
      email: 'E-mail',
      emailPlaceholder: 'Digite seu email',
      signUpPassword: 'Senha',
      passwordPlaceholder: 'Digite uma senha segura',
      passwordConfirmation: 'Confirme a senha',
      passwordRepeatPlaceholder: 'Repita a senha',
      signUp: 'Continuar',
      errors: {
        email: {
          required: 'E-mail é obrigatório',
          format: 'E-mail invalido'
        },
        password: {
          required: 'Senha é obrigatória',
          min: 'Senha deve ter no mínimo 6 caracteres'
        },
        passwordConfirmation: {
          required: 'Confirmação de senha é obrigatório',
          oneOf: 'As senhas não correspondem'
        },
        nameValidator: {
          required: 'Nome é obrigatório'
        }
      }
    }
  },
  en: {
    signUp: {
      title: "Let's get started",
      subtitle: 'Create an eSoja account to have access to all features',
      imagePlaceholder: 'Add image',
      imageUpdatePictureLabel: 'Change Image',
      name: 'Name',
      namePlaceholder: 'Enter a name for the field',
      email: 'Email',
      emailPlaceholder: 'Type your email',
      signUpPassword: 'Password',
      passwordPlaceholder: 'Enter a secure password',
      passwordConfirmation: 'Confirm the password',
      passwordRepeatPlaceholder: 'Repeat the password',
      signUp: 'Continue',
      errors: {
        email: {
          required: 'Email is required',
          format: 'Invalid email'
        },
        password: {
          required: 'Password is required',
          min: 'Password must be at least 6 characters long'
        },
        passwordConfirmation: {
          required: 'Password confirmation is required',
          oneOf: 'Passwords do not match'
        },
        nameValidator: {
          required: 'Name is required'
        }
      }
    }
  }
};
