# IW3 Shop

Proyecto práctico unificado 2025 para la materia **Ingeniería Web 3**.  
Aplicación desarrollada en **Vue 3 + Vite + Vuetify** que integra directivas, router, manejo de estado, autenticación y persistencia en LocalStorage.

---

## Funcionalidades

- Lista de productos con búsqueda en vivo.
- Carrito de compras con subtotal, total y control de stock.
- Persistencia en LocalStorage (productos, carrito y sesión).
- Registro y login de usuarios con validaciones básicas.
- Rutas con guardas y detalle dinámico de productos.
- Interfaz armada con Vuetify 3.

---

## Estructura principal

src/
├─ components/ # Componentes reutilizables (toolbar, lista, carrito)
├─ composables/ # Lógica de autenticación y carrito
├─ data/ # Catálogo de productos con persistencia
├─ views/ # Vistas principales (Home, Productos, Clientes, Login, Registro)
├─ router/ # Configuración de rutas y guardas
└─ plugins/ # Configuración de Vuetify


---

## Instalación y ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

Abrir en el navegador: http://localhost:5173

```
Rutas principales

/ → Inicio

/productos → Lista de productos

/productos/:id → Detalle de producto

/clientes → Registro de cliente

/login → Iniciar sesión

/registro → Crear cuenta