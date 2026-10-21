# Zylo — AI Design System

> Este documento guía a asistentes de IA y desarrolladores al diseñar, implementar o modificar la interfaz de Zylo.  
> Los valores visuales viven en `design-tokens.md`. Consultar ese archivo antes de crear o cambiar estilos.

## 1. Misión

Construir una interfaz de entrenamiento coherente, cálida y práctica para que las personas puedan planificar su semana, registrar series, controlar descansos y revisar su evolución.

El diseño debe sentirse intencional y humano, no como una plantilla genérica generada por IA. La personalidad de Zylo aparece mediante el uso disciplinado del terracota, los neutros cálidos, Plus Jakarta Sans, jerarquía tipográfica, componentes funcionales y detalles medidos; no mediante decoración excesiva.

## 2. Principios no negociables

1. **Función antes que decoración.** Cada elemento visual debe ayudar a comprender, navegar, registrar o decidir.
2. **Consistencia antes que novedad.** Reutilizar componentes y tokens existentes antes de inventar otros.
3. **Densidad equilibrada.** Mostrar información útil sin llenar la pantalla de tarjetas ni desperdiciar espacio.
4. **Cálido, no infantil.** Usar neutros cálidos y terracota, pero conservar una jerarquía sobria y profesional.
5. **Radios moderados.** Evitar convertir todo en cápsulas o tarjetas gigantes redondeadas.
6. **Color con significado.** Terracota para marca y acción primaria; oliva para progreso o éxito cuando sea semánticamente correcto; estados de error/advertencia con sus tokens dedicados.
7. **Accesibilidad por defecto.** Contraste, foco, navegación por teclado, etiquetas y objetivos táctiles son parte del diseño.
8. **Responsive real.** Diseñar el comportamiento de cada componente en móvil y escritorio, no solo reducir su ancho.
9. **Datos reales.** No inventar métricas, entrenamientos, gráficos, récords ni porcentajes para hacer una pantalla más vistosa.
10. **Respetar la arquitectura existente.** Antes de añadir dependencias, componentes globales o mecanismos de estilos, inspeccionar lo que ya usa el proyecto.

## 3. Fuentes de verdad

Antes de implementar una pantalla:

1. Leer `design-tokens.md`.
2. Inspeccionar los componentes, rutas, estilos, variables y convenciones existentes.
3. Reutilizar componentes existentes si cumplen los requisitos.
4. Si los tokens todavía no están implementados en el código, proponer o crear una implementación compatible con la arquitectura existente.
5. No duplicar sistemas de estilos. Si el proyecto usa CSS variables, Tailwind, Sass, CSS Modules u otra solución, mapear los tokens a ella.
6. Si una decisión de diseño no está documentada, elegir la solución más simple que respete los principios de este archivo y actualizar la documentación cuando la decisión afecte a otros componentes.

No asumir frameworks, rutas, librerías, estructura de carpetas ni nombres de componentes sin inspeccionar el repositorio.

## 4. Identidad visual

- Marca: Zylo.
- Personalidad: cálida, moderna, amigable, funcional y enfocada en la constancia.
- Tipografía: Plus Jakarta Sans para toda la interfaz.
- Paleta: terracota, marfil, arena, carbón cálido y oliva.
- Temas: claro y oscuro.
- Superficies: diferenciadas con moderación, mediante tono y borde fino.
- Bordes: finos y discretos.
- Radios: moderados, generalmente entre 6 y 16 px según la escala de tokens.
- Sombras: suaves y solo para expresar elevación real.
- Iconografía: usar el sistema de iconos ya presente en el proyecto; mantener tamaño, grosor y alineación consistentes. No mezclar estilos de iconos sin motivo.

### Evitar expresamente

- Degradados decorativos como recurso por defecto.
- Glassmorphism, brillos, efectos neon o sombras grandes.
- Una tarjeta para cada elemento, o tarjetas anidadas sin una jerarquía funcional.
- Botones en forma de píldora por todas partes.
- Colores de acento en todos los elementos a la vez.
- Grandes titulares que empujen hacia abajo la función principal.
- Badges decorativos que no comunican un estado real.
- Iconos aleatorios usados solo para llenar espacio.
- Gráficos falsos, métricas de ejemplo presentadas como datos reales o tendencias inventadas.
- Animaciones de entrada para cada bloque o microinteracciones que ralentizan el registro.
- Textos de interfaz vagos como “¡A romperla!” cuando una instrucción directa sería más clara.
- Estilos nuevos que no aparecen en los tokens sin justificar y documentar la excepción.

## 5. Modelo de navegación

### Escritorio

Usar una sidebar para la navegación principal. Debe incluir icono y etiqueta de texto, estado activo reconocible y foco de teclado. La sidebar no debe ocupar más espacio del necesario ni convertirse en un panel decorativo.

### Móvil

Usar navegación inferior para los destinos principales. Mantener etiquetas legibles, objetivos táctiles adecuados y suficiente espacio para el contenido. No trasladar literalmente la sidebar al móvil.

### Reglas generales

- La navegación global contiene destinos de primer nivel.
- Acciones contextuales, como añadir una serie o un ejercicio, pertenecen al contenido de la pantalla.
- No usar solo el color para señalar la ruta activa.
- Mantener una jerarquía estable entre secciones y acciones.

## 6. Estructura de pantallas

Cada pantalla debe responder, en orden, a estas preguntas:

1. ¿Dónde estoy?
2. ¿Qué información o tarea es la principal?
3. ¿Cuál es la siguiente acción más probable?
4. ¿Qué información secundaria necesito para completar la tarea?

Usar título de página, contenido principal y acciones contextuales según necesidad. No agregar un dashboard estadístico entre el usuario y la planificación semanal si no ayuda a su tarea.

### Planificación semanal

- Es la experiencia principal de Zylo.
- Los siete días deben ser fáciles de explorar y reconocer.
- Indicar de forma clara qué días tienen rutina, cuáles están vacíos y cuál está seleccionado.
- Facilitar agregar, editar y consultar rutinas sin múltiples pasos innecesarios.
- En escritorio, aprovechar el espacio con una composición clara; en móvil, priorizar una lista o selector semanal que se pueda operar con una mano.
- No crear siete tarjetas enormes si una lista compacta y clara funciona mejor.
- Los días vacíos deben orientar al usuario a crear una rutina sin parecer un error.

### Detalle de rutina

- Mostrar nombre de la rutina y día asociado.
- Ordenar ejercicios de manera clara.
- Mantener las acciones de añadir, editar, reordenar y eliminar fáciles de localizar.
- Las acciones destructivas deben ser distinguibles y pedir confirmación cuando la pérdida sea difícil de revertir.
- No esconder acciones esenciales exclusivamente en hover.

### Entrenamiento activo y registro de series

El registro es una tarea frecuente y debe ser rápido.

- Mostrar cada ejercicio con nombre, series y datos relevantes.
- Cada serie puede incluir número, peso, repeticiones y estado de completado.
- Mantener alineación de los valores numéricos y unidades explícitas.
- Usar controles de tamaño adecuado para tocar en móvil.
- En móvil, evitar tablas que obliguen a desplazarse horizontalmente para cada serie; convertirlas en filas adaptables o bloques compactos cuando sea más claro.
- Completar una serie debe producir una señal inmediata y accesible sin borrar valores.
- No añadir gráficos, consejos o bloques promocionales dentro del flujo de registro si distraen de la tarea.
- Los campos deben conservar sus valores cuando se cambia el estado de completado, salvo que la lógica funcional requiera lo contrario.
- Mostrar validaciones cerca del campo y explicar cómo corregir el problema.

### Temporizador de descanso

- El tiempo restante debe ser el elemento visual principal del temporizador, sin dominar toda la pantalla.
- Diferenciar ejecución, pausa y finalización.
- Mantener pausa/reanudación y reinicio fáciles de encontrar.
- Evitar que una animación sea la única indicación del tiempo o del final.
- Respetar preferencias de movimiento reducido y permitir que el usuario mantenga el control.

### Notas de ejercicios

- Mostrar el nombre del ejercicio por encima de las notas.
- Diferenciar notas vacías de contenido existente.
- No convertir una nota normal en una alerta.
- Permitir editar sin crear una pantalla visualmente pesada.

### Estadísticas e historial

- Mostrar solo métricas derivadas de datos disponibles.
- Incluir unidad, periodo y contexto para que una cifra tenga sentido.
- Ofrecer un estado vacío útil cuando no haya suficiente historial.
- No representar datos ficticios como si fueran resultados del usuario.
- Mantener colores de gráficos consistentes y con contraste suficiente.
- Evitar usar color como único medio para distinguir series.

## 7. Reglas para componentes

### Botones

- Usar variantes existentes: primario, secundario, terciario/ghost, destructivo e icon button.
- Reservar el primario para la acción principal del contexto.
- Mantener textos de acción concretos: “Guardar rutina”, “Añadir ejercicio”, “Completar serie”.
- Incluir estados hover, active, focus-visible, disabled y loading según corresponda.
- No crear botones solo con iconos sin nombre accesible; añadir etiqueta accesible y tooltip cuando sea útil.
- Evitar que cada botón sea del color de marca.

### Tarjetas

- Usar solo cuando agrupen contenido relacionado.
- Aplicar los tokens de superficie, borde, padding y radio.
- Evitar tarjetas anidadas sin necesidad.
- La jerarquía debe surgir del título, el espaciado, la superficie y el orden, no de múltiples sombras.

### Formularios

- Etiqueta persistente para cada campo.
- Placeholder complementario, nunca sustituto de la etiqueta.
- Ayuda y error junto al control correspondiente.
- Foco visible y estados disabled/loading definidos.
- Para peso y repeticiones, mostrar unidades y permitir editar con claridad.
- No usar solo un borde rojo para explicar un error.

### Listas

- Mantener alineación, espaciado y orden consistentes.
- Usar divisores solo cuando mejoren el escaneo.
- Evitar controles decorativos que reduzcan el área disponible para el contenido.
- En móvil, asegurar que las acciones sigan siendo visibles y operables sin hover.

### Estados vacíos

Cada estado vacío debe:
1. Explicar qué falta.
2. Dar contexto en una frase corta.
3. Ofrecer una acción siguiente si existe una acción útil.
4. Evitar ilustraciones enormes o mensajes genéricos que desplacen la tarea.

### Confirmaciones y errores

- Explicar qué ocurrió con palabras simples.
- Si el usuario puede corregir el problema, indicar cómo.
- Confirmar acciones destructivas o difíciles de revertir.
- No mostrar un toast de éxito si la operación no se completó realmente.

## 8. Estados que debe contemplar cada componente

Definir solo los estados relevantes para el componente, pero no olvidar los estados no ideales:

- Default
- Hover (dispositivos con puntero)
- Active/pressed
- Focus-visible
- Selected
- Disabled
- Loading
- Error
- Success/completed
- Empty
- Skeleton, solo si hay una carga real

Los estados deben funcionar tanto en tema claro como oscuro. La selección y la finalización deben ser perceptibles sin depender solo del color.

## 9. Responsive y comportamiento

- Diseñar primero la tarea y luego adaptar la composición al ancho disponible.
- No asumir que un componente de escritorio funciona en móvil al reducir su tamaño.
- Evitar scroll horizontal accidental.
- Mantener acciones principales visibles y accesibles.
- En pantallas estrechas, priorizar el contenido y permitir que los metadatos secundarios pasen a una segunda línea.
- Mantener un ancho de lectura cómodo en escritorio.
- Evaluar el diseño al menos en móvil estrecho, móvil amplio/tablet y escritorio.
- Los breakpoints deben seguir el sistema ya usado por el repositorio; no añadir otro sistema sin necesidad.

## 10. Accesibilidad

- Objetivo WCAG 2.2 AA.
- Contraste de 4.5:1 para texto normal y 3:1 para texto grande y componentes gráficos relevantes.
- Foco de teclado claramente visible.
- Controles táctiles de al menos 44 × 44 px como objetivo.
- Etiquetas accesibles para icon buttons y controles personalizados.
- No depender exclusivamente del color para comunicar selección, error, progreso o completado.
- Mantener orden lógico de teclado y lectura.
- Respetar `prefers-reduced-motion`.
- Asegurar que los temas claro y oscuro mantengan legibilidad y jerarquía.

## 11. Cómo implementar una nueva pantalla

Al recibir una tarea de interfaz:

1. Inspeccionar la implementación actual y las convenciones del repositorio.
2. Identificar el objetivo de la pantalla y la acción principal.
3. Consultar `design-tokens.md`.
4. Reutilizar componentes y tokens existentes.
5. Diseñar el estado normal, los estados relevantes y el comportamiento responsive.
6. Implementar los temas claro y oscuro sin duplicar la lógica del componente.
7. Verificar accesibilidad, etiquetas, foco, contraste y objetivos táctiles.
8. Probar estados vacíos, error, carga y completado cuando correspondan.
9. Revisar que no haya valores visuales arbitrarios, tarjetas innecesarias o decoraciones genéricas.
10. Resumir qué se cambió y señalar cualquier decisión que haya requerido una excepción al sistema.

No modificar lógica de negocio, persistencia o contratos de API para resolver un problema puramente visual, salvo que la tarea lo solicite o que sea imprescindible y se explique.

## 12. Checklist antes de entregar

- [ ] Se usaron tokens existentes y no colores arbitrarios.
- [ ] Plus Jakarta Sans se mantiene como familia tipográfica.
- [ ] Los radios son moderados y coherentes.
- [ ] Las tarjetas agrupan información real y no se anidan sin motivo.
- [ ] La acción principal es clara.
- [ ] La vista funciona en escritorio y móvil.
- [ ] Los temas claro y oscuro conservan contraste y jerarquía.
- [ ] Se definieron estados relevantes: foco, hover, disabled, loading, error, vacío y completado.
- [ ] El registro de series sigue siendo rápido y fácil de usar.
- [ ] No hay métricas ficticias ni estados engañosos.
- [ ] Los controles tienen nombres accesibles y foco visible.
- [ ] No se agregaron dependencias o patrones duplicados sin justificación.
- [ ] Las excepciones al sistema quedaron documentadas.

## 13. Regla final

Si una solución parece más llamativa pero dificulta registrar una serie, encontrar una rutina o entender el progreso, no es la solución correcta para Zylo.

La mejor interfaz es la que se siente coherente y cuidada sin exigir atención innecesaria: **cálida en su identidad, clara en su jerarquía y rápida en el entrenamiento.**
