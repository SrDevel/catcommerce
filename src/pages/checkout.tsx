import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/context/cart-context';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CheckCircle } from 'lucide-react';

// Interfaces para datos del formulario
interface CustomerInfo {
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
}

interface ShippingInfo {
  direccion: string;
  codigoPostal: string;
  ciudad: string;
  estado: string;
  instrucciones?: string;
}

interface PaymentInfo {
  metodo: 'tarjeta' | 'transferencia' | 'efectivo';
  numeroTarjeta?: string;
  nombreTitular?: string;
  fechaExpiracion?: string;
  cvv?: string;
}

export default function CheckoutPage() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('customer');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: ''
  });
  
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    direccion: '',
    codigoPostal: '',
    ciudad: '',
    estado: ''
  });
  
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    metodo: 'tarjeta'
  });
  
  const subtotal = getTotalPrice();
  const shippingCost = subtotal > 1000 ? 0 : 150;
  const taxes = subtotal * 0.16;
  const total = subtotal + shippingCost + taxes;
  
  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };
  
  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };
  
  const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulamos el procesamiento del pago
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
      
      toast({
        title: "¡Pedido completado!",
        description: `Tu pedido ha sido procesado correctamente. Referencia: ${generateOrderReference()}`,
      });
    }, 2000);
  };
  
  const generateOrderReference = () => {
    return `OD-${Math.floor(Math.random() * 10000)}-${format(new Date(), 'ddMMyy')}`;
  };
  
  const nextTab = () => {
    if (activeTab === 'customer') setActiveTab('shipping');
    else if (activeTab === 'shipping') setActiveTab('payment');
  };
  
  const prevTab = () => {
    if (activeTab === 'shipping') setActiveTab('customer');
    else if (activeTab === 'payment') setActiveTab('shipping');
  };
  
  if (orderComplete) {
    return (
      <div className="container max-w-4xl mx-auto py-10">
        <Card className="w-full">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl">¡Gracias por tu compra!</CardTitle>
            <CardDescription>
              Tu pedido ha sido procesado correctamente. Referencia: {generateOrderReference()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Hemos enviado un correo electrónico a <strong>{customerInfo.email}</strong> con los detalles de tu pedido.</p>
            <p>Fecha estimada de entrega: <strong>{format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), "d 'de' MMMM 'de' yyyy", { locale: es })}</strong></p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => navigate("/")}>Volver a la tienda</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  if (cartItems.length === 0) {
    return (
      <div className="container max-w-4xl mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Tu carrito está vacío</CardTitle>
            <CardDescription>Agrega productos para continuar con el proceso de pago</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => navigate("/")}>Ver productos</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Finalizar compra</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Columna de formulario */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Detalles del pedido</CardTitle>
              <CardDescription>Completa la información para realizar tu compra</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="customer">Datos personales</TabsTrigger>
                  <TabsTrigger value="shipping">Envío</TabsTrigger>
                  <TabsTrigger value="payment">Pago</TabsTrigger>
                </TabsList>
                
                <TabsContent value="customer" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre</Label>
                      <Input 
                        id="nombre" 
                        name="nombre" 
                        value={customerInfo.nombre} 
                        onChange={handleCustomerInfoChange} 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="apellidos">Apellidos</Label>
                      <Input 
                        id="apellidos" 
                        name="apellidos" 
                        value={customerInfo.apellidos} 
                        onChange={handleCustomerInfoChange} 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={customerInfo.email} 
                      onChange={handleCustomerInfoChange} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input 
                      id="telefono" 
                      name="telefono" 
                      type="tel" 
                      value={customerInfo.telefono} 
                      onChange={handleCustomerInfoChange} 
                      required 
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={nextTab}>Continuar</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="shipping" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="direccion">Dirección</Label>
                    <Input 
                      id="direccion" 
                      name="direccion" 
                      value={shippingInfo.direccion} 
                      onChange={handleShippingInfoChange} 
                      required 
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="codigoPostal">Código postal</Label>
                      <Input 
                        id="codigoPostal" 
                        name="codigoPostal" 
                        value={shippingInfo.codigoPostal} 
                        onChange={handleShippingInfoChange} 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ciudad">Ciudad</Label>
                      <Input 
                        id="ciudad" 
                        name="ciudad" 
                        value={shippingInfo.ciudad} 
                        onChange={handleShippingInfoChange} 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado</Label>
                    <Select 
                      value={shippingInfo.estado} 
                      onValueChange={(value) => setShippingInfo({...shippingInfo, estado: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ciudad-de-mexico">Ciudad de México</SelectItem>
                        <SelectItem value="estado-de-mexico">Estado de México</SelectItem>
                        <SelectItem value="jalisco">Jalisco</SelectItem>
                        <SelectItem value="nuevo-leon">Nuevo León</SelectItem>
                        <SelectItem value="puebla">Puebla</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="instrucciones">Instrucciones de entrega (opcional)</Label>
                    <Input 
                      id="instrucciones" 
                      name="instrucciones" 
                      value={shippingInfo.instrucciones || ''} 
                      onChange={handleShippingInfoChange} 
                    />
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={prevTab}>Regresar</Button>
                    <Button onClick={nextTab}>Continuar</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="payment" className="space-y-4 mt-4">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-2">
                      <Label>Método de pago</Label>
                      <RadioGroup 
                        value={paymentInfo.metodo} 
                        onValueChange={(value: 'tarjeta' | 'transferencia' | 'efectivo') => 
                          setPaymentInfo({...paymentInfo, metodo: value})
                        }
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="tarjeta" id="tarjeta" />
                          <Label htmlFor="tarjeta">Tarjeta de crédito/débito</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="transferencia" id="transferencia" />
                          <Label htmlFor="transferencia">Transferencia bancaria</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="efectivo" id="efectivo" />
                          <Label htmlFor="efectivo">Pago en efectivo</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    {paymentInfo.metodo === 'tarjeta' && (
                      <div className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="numeroTarjeta">Número de tarjeta</Label>
                          <Input 
                            id="numeroTarjeta" 
                            name="numeroTarjeta" 
                            value={paymentInfo.numeroTarjeta || ''} 
                            onChange={handlePaymentInfoChange} 
                            placeholder="1234 5678 9012 3456" 
                            required 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="nombreTitular">Nombre del titular</Label>
                          <Input 
                            id="nombreTitular" 
                            name="nombreTitular" 
                            value={paymentInfo.nombreTitular || ''} 
                            onChange={handlePaymentInfoChange} 
                            placeholder="Como aparece en la tarjeta" 
                            required 
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="fechaExpiracion">Fecha de expiración</Label>
                            <Input 
                              id="fechaExpiracion" 
                              name="fechaExpiracion" 
                              value={paymentInfo.fechaExpiracion || ''} 
                              onChange={handlePaymentInfoChange} 
                              placeholder="MM/AA" 
                              required 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input 
                              id="cvv" 
                              name="cvv" 
                              value={paymentInfo.cvv || ''} 
                              onChange={handlePaymentInfoChange} 
                              placeholder="123" 
                              required 
                              maxLength={4}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {paymentInfo.metodo === 'transferencia' && (
                      <div className="p-4 mt-4 bg-muted/50 rounded-lg">
                        <h3 className="font-medium">Datos para transferencia:</h3>
                        <p>Banco: CatBank</p>
                        <p>Titular: CatCommerce S.A. de C.V.</p>
                        <p>CLABE: 0123 4567 8901 2345 67</p>
                        <p>Referencia: {generateOrderReference()}</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          * Una vez realizada la transferencia, envía el comprobante a pagos@catcommerce.com
                        </p>
                      </div>
                    )}
                    
                    {paymentInfo.metodo === 'efectivo' && (
                      <div className="p-4 mt-4 bg-muted/50 rounded-lg">
                        <h3 className="font-medium">Pago en efectivo:</h3>
                        <p>Puedes realizar tu pago en cualquier sucursal de:</p>
                        <ul className="list-disc ml-5 mt-2">
                          <li>OXXO</li>
                          <li>7-Eleven</li>
                          <li>Farmacias del Ahorro</li>
                        </ul>
                        <p className="text-sm text-muted-foreground mt-2">
                          * El código de pago se generará al confirmar el pedido
                        </p>
                      </div>
                    )}
                    
                    <div className="flex justify-between mt-6">
                      <Button variant="outline" onClick={prevTab} type="button">Regresar</Button>
                      <Button type="submit" disabled={isProcessing}>
                        {isProcessing ? 'Procesando...' : 'Finalizar compra'}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        {/* Columna de resumen */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Resumen del pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between">
                  <div className="flex gap-2">
                    <div className="w-12 h-12 rounded overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Cantidad: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span>
                    {shippingCost > 0 
                      ? `$${shippingCost.toFixed(2)}` 
                      : <span className="text-green-600">¡Gratis!</span>
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Impuestos</span>
                  <span>${taxes.toFixed(2)}</span>
                </div>
              </div>
              
              <Separator className="my-2" />
              
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}