import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  isNew?: boolean;
  inStock: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Air Force Pro",
    brand: "Nike",
    price: 12990,
    image: "https://cdn.poehali.dev/projects/d4deb591-b1d5-4343-ba8f-2f2a0c183a72/files/6899aea9-fcfd-4559-9415-78c1fd2621d3.jpg",
    isNew: true,
    inStock: true
  },
  {
    id: 2,
    name: "Court Elite",
    brand: "Jordan",
    price: 15990,
    image: "https://cdn.poehali.dev/projects/d4deb591-b1d5-4343-ba8f-2f2a0c183a72/files/1021ed5e-b568-44f0-94ba-3a12713c69af.jpg",
    isNew: true,
    inStock: true
  },
  {
    id: 3,
    name: "Zoom Flight",
    brand: "Nike",
    price: 13990,
    image: "https://cdn.poehali.dev/projects/d4deb591-b1d5-4343-ba8f-2f2a0c183a72/files/26d41c56-d8ed-47c9-adb2-678871d293fd.jpg",
    inStock: true
  },
  {
    id: 4,
    name: "Precision Max",
    brand: "Anta",
    price: 9990,
    image: "https://cdn.poehali.dev/projects/d4deb591-b1d5-4343-ba8f-2f2a0c183a72/files/6899aea9-fcfd-4559-9415-78c1fd2621d3.jpg",
    inStock: true
  },
  {
    id: 5,
    name: "Thunder Strike",
    brand: "Li-Ning",
    price: 11990,
    image: "https://cdn.poehali.dev/projects/d4deb591-b1d5-4343-ba8f-2f2a0c183a72/files/1021ed5e-b568-44f0-94ba-3a12713c69af.jpg",
    inStock: true
  },
  {
    id: 6,
    name: "Dynasty Pro",
    brand: "Jordan",
    price: 16990,
    image: "https://cdn.poehali.dev/projects/d4deb591-b1d5-4343-ba8f-2f2a0c183a72/files/26d41c56-d8ed-47c9-adb2-678871d293fd.jpg",
    inStock: true
  }
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-secondary text-secondary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🏀</div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">SKBasketShop</h1>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <a href="#catalog" className="hover:text-primary transition-colors font-medium">Каталог</a>
              <a href="#about" className="hover:text-primary transition-colors font-medium">О нас</a>
              <a href="#contact" className="hover:text-primary transition-colors font-medium">Контакты</a>
            </nav>

            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="relative bg-background hover:bg-muted">
                    <Icon name="ShoppingCart" size={20} />
                    {cartCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {cartCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg">
                  <SheetHeader>
                    <SheetTitle className="text-2xl">Корзина</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 flex flex-col gap-4">
                    {cart.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">Корзина пуста</p>
                    ) : (
                      <>
                        {cart.map(item => (
                          <Card key={item.id} className="overflow-hidden">
                            <CardContent className="p-4">
                              <div className="flex gap-4">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                <div className="flex-1">
                                  <h4 className="font-semibold">{item.name}</h4>
                                  <p className="text-sm text-muted-foreground">{item.brand}</p>
                                  <p className="text-lg font-bold text-primary mt-1">{item.price.toLocaleString('ru-RU')} ₽</p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                      <Icon name="Minus" size={14} />
                                    </Button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                      <Icon name="Plus" size={14} />
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="destructive"
                                      onClick={() => removeFromCart(item.id)}
                                      className="ml-auto"
                                    >
                                      <Icon name="Trash2" size={14} />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        <div className="border-t pt-4 mt-4">
                          <div className="flex justify-between text-xl font-bold mb-4">
                            <span>Итого:</span>
                            <span className="text-primary">{cartTotal.toLocaleString('ru-RU')} ₽</span>
                          </div>
                          <Button className="w-full" size="lg">
                            Оформить заказ
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
              </Button>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav className="md:hidden flex flex-col gap-3 mt-4 pb-2 animate-fade-in">
              <a href="#catalog" className="hover:text-primary transition-colors font-medium">Каталог</a>
              <a href="#about" className="hover:text-primary transition-colors font-medium">О нас</a>
              <a href="#contact" className="hover:text-primary transition-colors font-medium">Контакты</a>
            </nav>
          )}
        </div>
      </header>

      <section className="relative bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-9xl">🏀</div>
          <div className="absolute bottom-10 right-10 text-9xl">👟</div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Лучшая баскетбольная обувь для твоей игры
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Оригинальные кроссовки Nike, Jordan, Anta, Li-Ning с доставкой по России
            </p>
            <Button size="lg" className="text-lg px-8 hover:scale-105 transition-transform">
              <a href="#catalog">Смотреть каталог</a>
            </Button>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Наш каталог</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.map((product, index) => (
              <Card 
                key={product.id} 
                className="group overflow-hidden hover:shadow-2xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden bg-muted">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.isNew && (
                      <Badge className="absolute top-3 right-3 bg-primary">NEW</Badge>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
                    <h3 className="text-xl font-bold mb-3">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-primary">{product.price.toLocaleString('ru-RU')} ₽</p>
                      <Button 
                        onClick={() => addToCart(product)}
                        className="hover:scale-105 transition-transform"
                        disabled={!product.inStock}
                      >
                        <Icon name="ShoppingCart" size={18} className="mr-2" />
                        В корзину
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">О нас</h2>
            <p className="text-lg mb-6">
              SKBasketShop — магазин оригинальной баскетбольной обуви. Мы работаем напрямую с официальными дистрибьюторами Nike, Jordan, Anta и Li-Ning.
            </p>
            <p className="text-lg mb-6">
              Наша миссия — сделать профессиональную баскетбольную экипировку доступной для каждого игрока в России.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-5xl mb-3">✅</div>
                <h3 className="font-bold text-xl mb-2">100% оригинал</h3>
                <p className="text-muted-foreground">Гарантия подлинности</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-3">🚚</div>
                <h3 className="font-bold text-xl mb-2">Доставка по РФ</h3>
                <p className="text-muted-foreground">Быстрая и надёжная</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-3">💳</div>
                <h3 className="font-bold text-xl mb-2">Удобная оплата</h3>
                <p className="text-muted-foreground">Любым способом</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Контакты</h2>
            <div className="space-y-4 text-lg">
              <div className="flex items-center justify-center gap-3">
                <Icon name="Phone" size={24} className="text-primary" />
                <a href="tel:+79991234567" className="hover:text-primary transition-colors">+7 (999) 123-45-67</a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Icon name="Mail" size={24} className="text-primary" />
                <a href="mailto:info@skbasketshop.ru" className="hover:text-primary transition-colors">info@skbasketshop.ru</a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Icon name="MapPin" size={24} className="text-primary" />
                <p>Москва, ул. Баскетбольная, 1</p>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-8">
              <Button variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                <Icon name="Instagram" size={24} />
              </Button>
              <Button variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                <Icon name="Facebook" size={24} />
              </Button>
              <Button variant="outline" size="icon" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                <Icon name="MessageCircle" size={24} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-secondary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-80">© 2024 SKBasketShop. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
