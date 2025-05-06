import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { Cat, UserPlus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RegisterFormValues } from '@/types/auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Schema de validación para el formulario de registro
const registerFormSchema = z.object({
  name: z.string({
    required_error: 'Debe proporcionar un nombre',
  }),
  username: z.string({
    required_error: 'Debe proporcionar un nombre de usuario',
  }).min(3, {
    message: 'El nombre de usuario debe tener al menos 3 caracteres',
  }).max(50, {
    message: 'El nombre de usuario no puede tener más de 50 caracteres',
  }),
  password: z.string({
    required_error: 'Debe proporcionar una contraseña',
  }).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message: 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial',
    }
  ),
  email: z.string({
    required_error: 'Debe proporcionar una dirección de correo electrónico',
  }).email({
    message: 'El correo electrónico no es válido',
  }),
  phoneNumber: z.string({
    required_error: 'Debe proporcionar un número de teléfono',
  }).regex(/^\+?[0-9]{10,15}$/, {
    message: 'El número de teléfono no es válido',
  }),
});

interface RegisterFormProps {
  onSubmit: (values: RegisterFormValues) => void;
  isLoading?: boolean;
}

export function RegisterForm({ onSubmit, isLoading = false }: RegisterFormProps) {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      username: '',
      password: '',
      email: '',
      phoneNumber: '',
    },
    mode: 'onChange', // Validar al escribir para mejor feedback
  });

  function handleSubmit(values: z.infer<typeof registerFormSchema>) {
    onSubmit(values);
  }

  return (
    <Card className="max-w-md w-full mx-auto shadow-lg border-primary/10 animate-in fade-in-50 duration-300">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-2">
          <Cat className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">Crear una cuenta</CardTitle>
        <CardDescription>
          Ingresa tus datos para registrarte en CatCommerce
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="personal">Datos personales</TabsTrigger>
                <TabsTrigger value="account">Cuenta</TabsTrigger>
              </TabsList>
              <TabsContent value="personal" className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre completo</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Juan Pérez" 
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo electrónico</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="juan@example.com" 
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
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de teléfono</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="+34612345678" 
                          {...field} 
                          className="bg-background/50 border-primary/20 focus-visible:ring-primary/30"
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Formato: +34612345678 o 612345678
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="account" className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de usuario</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="juanperez" 
                          {...field} 
                          className="bg-background/50 border-primary/20 focus-visible:ring-primary/30"
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Entre 3 y 50 caracteres
                      </FormDescription>
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
                      <FormDescription className="text-xs">
                        Mínimo 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>

            <Button 
              type="submit" 
              className="w-full mt-6 transition-all hover:shadow-md hover:shadow-primary/20"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">⊚</span>
                  Creando cuenta...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Crear cuenta
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 text-center text-sm">
        <div className="text-muted-foreground">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-primary font-medium hover:underline transition-colors">
            Inicia sesión
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