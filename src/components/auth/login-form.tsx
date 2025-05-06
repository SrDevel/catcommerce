import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { Cat, LogIn } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginFormValues } from '@/types/auth';

// Schema de validación para el formulario de inicio de sesión
const loginFormSchema = z.object({
  username: z.string({
    required_error: 'El nombre de usuario no puede estar vacío',
  }),
  password: z.string({
    required_error: 'La contraseña no puede estar vacía',
  }),
});

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
  isLoading?: boolean;
}

export function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  function handleSubmit(values: z.infer<typeof loginFormSchema>) {
    onSubmit(values);
  }

  return (
    <Card className="max-w-md w-full mx-auto shadow-lg border-primary/10 animate-in fade-in-50 duration-300">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-2">
          <Cat className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">Bienvenido de nuevo</CardTitle>
        <CardDescription>
          Ingresa tus credenciales para acceder a tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de usuario</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="usuario" 
                      {...field} 
                      className="bg-background/50 border-primary/20 focus-visible:ring-primary/30"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="********" 
                      {...field} 
                      className="bg-background/50 border-primary/20 focus-visible:ring-primary/30"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full transition-all hover:shadow-md hover:shadow-primary/20"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">⊚</span>
                  Iniciando sesión...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Iniciar sesión
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 text-center text-sm">
        <div className="text-muted-foreground">
          ¿No tienes una cuenta?{' '}
          <Link to="/registro" className="text-primary font-medium hover:underline transition-colors">
            Regístrate ahora
          </Link>
        </div>
        <div className="text-muted-foreground">
          <Link to="/" className="text-sm hover:underline transition-colors">
            Volver al inicio
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}