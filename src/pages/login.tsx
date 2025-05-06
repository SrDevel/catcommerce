import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '@/components/auth/login-form';
import { LoginFormValues } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = async (values: LoginFormValues) => {
    setIsLoading(true);

    try {
      // Aquí iría la lógica para conectar con tu API de backend
      // Por ejemplo:
      // await api.auth.login(values);
      
      console.log('Iniciando sesión con:', values);
      
      // Simulamos una pequeña espera
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: '¡Inicio de sesión exitoso!',
        description: 'Bienvenido/a a CatCommerce.',
      });

      // Redirigir al usuario a la página de inicio después del login exitoso
      navigate('/');
    } catch (error) {
      console.error('Error en inicio de sesión:', error);
      toast({
        variant: 'destructive',
        title: 'Error al iniciar sesión',
        description: 'Credenciales incorrectas. Por favor, inténtalo de nuevo.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-8 px-4">
      <div className="w-full max-w-md mx-auto">
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
      </div>
    </div>
  );
}