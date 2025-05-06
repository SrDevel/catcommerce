import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '@/components/auth/register-form';
import { RegisterFormValues } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleRegister = async (values: RegisterFormValues) => {
    setIsLoading(true);

    try {
      // Aquí iría la lógica para conectar con tu API de backend
      // Por ejemplo:
      // await api.auth.register(values);
      
      console.log('Registrando usuario con:', values);
      
      // Simulamos una pequeña espera
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: '¡Registro exitoso!',
        description: 'Tu cuenta ha sido creada correctamente.',
      });

      // Redirigir al usuario a la página de inicio de sesión después del registro exitoso
      navigate('/login');
    } catch (error) {
      console.error('Error en registro:', error);
      toast({
        variant: 'destructive',
        title: 'Error al registrarse',
        description: 'Ha ocurrido un error al crear la cuenta. Por favor, inténtalo de nuevo.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-8 px-4">
      <div className="w-full max-w-md mx-auto">
        <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
      </div>
    </div>
  );
}