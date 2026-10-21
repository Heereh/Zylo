# Zylo — Design Tokens

> **Estado:** v1.0 inicial  
> **Producto:** Zylo, aplicación web adaptable para planificar rutinas y registrar entrenamientos.  
> **Identidad:** cálida, contemporánea, funcional y amigable.  
> **Principio rector:** el diseño debe facilitar la constancia y el registro del entrenamiento; nunca competir con ellos.

Este documento define los valores visuales de referencia para Zylo. Los tokens son la fuente de verdad para colores, tipografía, espaciado, formas, elevación, movimiento y estados de interfaz. Si una implementación existente usa variables equivalentes, mapear estos tokens a la arquitectura actual antes de duplicarlos.

Los colores indicados son una base inicial y deben verificarse en la interfaz real, especialmente el contraste en ambos temas. No reemplazar tokens por valores arbitrarios dentro de componentes sin una razón documentada.

---

## 1. Dirección visual

- Cálida y moderna, con terracota como color de marca.
- Neutros cálidos como base; oliva como acento secundario.
- Densidad equilibrada: suficiente información visible, sin saturación.
- Bordes finos y radios moderados; evitar tarjetas excesivamente redondeadas.
- Sin degradados decorativos, sombras pesadas, glassmorphism ni adornos sin función.
- La interfaz debe sentirse como un producto cuidado, no como una plantilla corporativa genérica.
- Priorizar legibilidad, jerarquía y rapidez de interacción sobre la decoración.

## 2. Colores primitivos

Estos valores son la paleta base. En componentes, preferir los tokens semánticos de la sección siguiente en lugar de usar directamente los primitivos.

| Token | Valor | Uso de referencia |
|---|---|---|
| `terracotta-700` | `#984832` | Terracota oscuro; texto o acentos cuando se necesita más contraste |
| `terracotta-600` | `#B85C42` | Acento de marca principal |
| `terracotta-500` | `#C76B50` | Variante algo más luminosa |
| `terracotta-100` | `#F1DDD4` | Fondo suave para selección o énfasis |
| `terracotta-050` | `#FAF0EB` | Fondo muy sutil |
| `ivory-050` | `#FBF8F3` | Fondo claro elevado |
| `ivory-100` | `#F5F0E8` | Fondo claro principal |
| `sand-200` | `#E4D5C5` | Superficie cálida o borde con presencia |
| `sand-300` | `#D9C8B8` | Separadores y bordes cálidos |
| `olive-700` | `#58634D` | Oliva oscuro para contraste |
| `olive-600` | `#69765B` | Oliva funcional |
| `olive-500` | `#77816A` | Acento secundario |
| `olive-100` | `#E4E8DE` | Fondo de éxito/progreso suave |
| `charcoal-950` | `#211F1C` | Fondo oscuro profundo |
| `charcoal-900` | `#292724` | Carbón cálido principal |
| `charcoal-800` | `#34302C` | Superficie oscura elevada |
| `charcoal-700` | `#403B36` | Superficie oscura secundaria |
| `warm-gray-700` | `#625B53` | Texto secundario sobre fondos claros |
| `warm-gray-500` | `#81786F` | Texto terciario; revisar contraste antes de usar en texto pequeño |
| `warm-gray-300` | `#C9BFB4` | Bordes discretos |
| `white` | `#FFFFFF` | Texto sobre acentos oscuros, cuando contraste suficiente |
| `black` | `#171614` | Texto de alto contraste en fondos claros |

### Colores de estado

Los colores de estado deben comunicar significado de forma consistente. No depender únicamente del color: acompañar con texto, icono o patrón cuando corresponda.

| Estado | Claro | Fondo suave claro | Oscuro | Fondo suave oscuro |
|---|---|---|---|---|
| Éxito | `#58634D` | `#E4E8DE` | `#B6C6A5` | `#343D2F` |
| Advertencia | `#8A5B17` | `#F5E8C9` | `#E8C77E` | `#45371F` |
| Error | `#A33D32` | `#F6E1DD` | `#F0A39A` | `#482B28` |
| Información | `#42677A` | `#E0EBF0` | `#A5C8D8` | `#293C45` |

Los colores de estado no reemplazan al terracota de marca. Usarlos solamente para indicar el estado correspondiente.

---

## 3. Tokens semánticos por tema

Los componentes deben consumir estos tokens semánticos. El tema claro y el oscuro comparten la misma identidad; cambia la asignación de superficies y contraste, no la estructura visual.

### Tema claro

| Token semántico | Valor | Uso |
|---|---|---|
| `color.bg` | `#F5F0E8` | Fondo general de la aplicación |
| `color.surface` | `#FBF8F3` | Tarjetas y superficies principales |
| `color.surface-raised` | `#FFFFFF` | Diálogos, popovers y superficies elevadas |
| `color.surface-muted` | `#EDE5DB` | Elementos secundarios y áreas agrupadas |
| `color.text` | `#292724` | Texto principal |
| `color.text-muted` | `#625B53` | Texto secundario |
| `color.text-subtle` | `#746B62` | Metadatos; comprobar contraste para tamaños pequeños |
| `color.border` | `#D9C8B8` | Bordes de tarjetas y campos |
| `color.border-subtle` | `#E7DED4` | Separadores y bordes de baja jerarquía |
| `color.brand` | `#B85C42` | Marca y acciones principales |
| `color.brand-hover` | `#984832` | Hover de acciones principales |
| `color.brand-pressed` | `#813B29` | Estado presionado |
| `color.brand-soft` | `#F1DDD4` | Selección o fondo de énfasis suave |
| `color.on-brand` | `#FFFFFF` | Texto/iconos sobre el acento; verificar contraste |
| `color.accent` | `#69765B` | Acento secundario y progreso |
| `color.focus-ring` | `#984832` | Indicador de foco accesible |
| `color.overlay` | `rgba(33, 31, 28, 0.48)` | Fondo detrás de diálogos |

### Tema oscuro

| Token semántico | Valor | Uso |
|---|---|---|
| `color.bg` | `#211F1C` | Fondo general |
| `color.surface` | `#292724` | Tarjetas y superficies principales |
| `color.surface-raised` | `#34302C` | Diálogos, popovers y superficies elevadas |
| `color.surface-muted` | `#403B36` | Elementos secundarios y áreas agrupadas |
| `color.text` | `#F5F0E8` | Texto principal |
| `color.text-muted` | `#D0C6BA` | Texto secundario |
| `color.text-subtle` | `#B7AA9C` | Metadatos; comprobar contraste en texto pequeño |
| `color.border` | `#514940` | Bordes de tarjetas y campos |
| `color.border-subtle` | `#403B36` | Separadores discretos |
| `color.brand` | `#D88970` | Acento de marca adaptado al fondo oscuro |
| `color.brand-hover` | `#E39A82` | Hover de acciones |
| `color.brand-pressed` | `#C76B50` | Estado presionado |
| `color.brand-soft` | `#482F29` | Selección o énfasis suave |
| `color.on-brand` | `#211F1C` | Texto sobre el acento claro |
| `color.accent` | `#AAB99A` | Acento secundario y progreso |
| `color.focus-ring` | `#E39A82` | Indicador de foco accesible |
| `color.overlay` | `rgba(0, 0, 0, 0.64)` | Fondo detrás de diálogos |

> **Nota de contraste:** los valores son candidatos de diseño, no una certificación WCAG. Verificar contraste real de texto normal, texto grande, iconos y controles antes de publicar. Ajustar tonos si no cumplen WCAG 2.2 AA (objetivo mínimo: 4.5:1 para texto normal y 3:1 para texto grande y componentes gráficos relevantes).

---

## 4. Tipografía

### Familia

- Familia principal: **Plus Jakarta Sans**.
- Usar la misma familia en títulos, texto, controles y métricas para mantener una identidad coherente.
- Cargar los pesos necesarios desde una fuente fiable o desde los assets del proyecto; evitar descargar variantes innecesarias.
- Fallback recomendado: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.
- No usar tipografías decorativas en títulos ni mezclar una segunda familia sin una decisión de diseño explícita.

### Pesos

| Token | Peso | Uso |
|---|---:|---|
| `font.weight.regular` | 400 | Texto general, campos y descripciones |
| `font.weight.medium` | 500 | Etiquetas, navegación y datos auxiliares importantes |
| `font.weight.semibold` | 600 | Títulos de sección, botones y nombres de ejercicios |
| `font.weight.bold` | 700 | Título de página y métricas principales; uso moderado |

### Escala tipográfica

| Token | Tamaño | Line-height | Uso |
|---|---:|---:|---|
| `font.size.xs` | 12 px | 16 px | Etiquetas auxiliares y metadatos |
| `font.size.sm` | 14 px | 20 px | Texto secundario, descripciones y ayuda |
| `font.size.md` | 16 px | 24 px | Texto principal y campos |
| `font.size.lg` | 18 px | 28 px | Títulos pequeños y énfasis |
| `font.size.xl` | 20 px | 28 px | Títulos de tarjetas o subsecciones |
| `font.size.2xl` | 24 px | 32 px | Título de página en móvil o sección importante |
| `font.size.3xl` | 30 px | 36 px | Título principal en escritorio |
| `font.size.display` | 36 px | 40 px | Métricas o encabezados excepcionales |

Reglas:
- El cuerpo estándar es 16 px; usar 14 px para información secundaria, no para todo.
- No usar texto menor de 12 px para información esencial.
- Las métricas deben usar números legibles y alineados; activar cifras tabulares (`font-variant-numeric: tabular-nums`) para pesos, tiempos y contadores.
- Evitar títulos enormes que desplacen el contenido útil en móvil.
- Mantener etiquetas cortas y claras; no usar mayúsculas sostenidas en párrafos.

---

## 5. Espaciado y layout

Usar una escala de 4 px. Los valores intermedios solo se permiten cuando una necesidad concreta lo justifique.

| Token | Valor | Uso habitual |
|---|---:|---|
| `space.1` | 4 px | Separación mínima entre icono y texto compacto |
| `space.2` | 8 px | Separación entre elementos relacionados |
| `space.3` | 12 px | Padding compacto y grupos pequeños |
| `space.4` | 16 px | Padding estándar de controles y tarjetas compactas |
| `space.5` | 20 px | Separación de grupos |
| `space.6` | 24 px | Padding de tarjeta y separación entre secciones |
| `space.8` | 32 px | Separación entre secciones principales |
| `space.10` | 40 px | Espaciado amplio, uso puntual |
| `space.12` | 48 px | Separación de bloques grandes |
| `space.16` | 64 px | Solo para composición de páginas de marketing o pantallas especiales |

### Reglas de densidad

- Densidad objetivo: equilibrada.
- Tarjetas normales: 16–20 px de padding en escritorio; 12–16 px en móvil, según el contenido.
- Las filas de ejercicios deben ser compactas y fáciles de escanear.
- No colocar una tarjeta dentro de otra tarjeta salvo que exista una jerarquía funcional real.
- Separar secciones por espaciado antes de añadir más bordes.
- En móvil, no desperdiciar el primer viewport con encabezados o banners decorativos.
- Las áreas táctiles importantes deben tener al menos 44 × 44 px; apuntar a 48 px cuando el layout lo permita.

### Contenedores

- Ancho de lectura y formularios: limitar a un ancho cómodo; evitar campos de texto excesivamente largos en escritorio.
- Vista principal de planificación: usar el espacio disponible sin estirar listas hasta resultar difíciles de escanear.
- En pantallas anchas, la navegación lateral puede quedar fija y el contenido principal mantener un ancho máximo razonable.
- Definir breakpoints de acuerdo con el sistema ya usado por el proyecto. Si no existe uno, comenzar con 640 px (móvil/tablet), 768 px y 1024 px como puntos de evaluación, no como reglas rígidas para todos los componentes.

---

## 6. Bordes, radios y elevación

### Radios

| Token | Valor | Uso |
|---|---:|---|
| `radius.sm` | 6 px | Chips pequeños, elementos compactos |
| `radius.md` | 10 px | Inputs, botones y controles |
| `radius.lg` | 12 px | Tarjetas estándar |
| `radius.xl` | 16 px | Diálogos o superficies grandes cuando lo necesiten |
| `radius.pill` | 999 px | Solo chips o indicadores diseñados expresamente como píldora |

Reglas:
- No usar radios de 24–32 px en todas las tarjetas.
- Evitar que botones, tarjetas, campos y modales compartan automáticamente el mismo radio.
- Usar esquinas moderadas y consistentes, no completamente cuadradas ni exageradamente redondeadas.

### Bordes

- Grosor estándar: 1 px.
- Usar `color.border` en tarjetas, campos y controles interactivos cuando ayude a delimitar la superficie.
- Usar `color.border-subtle` para separadores.
- No dibujar bordes alrededor de cada elemento de una lista si el espaciado o un divisor ya da suficiente estructura.
- El borde de foco debe ser visible y no depender únicamente de un cambio de color de fondo.

### Elevación y sombras

- Nivel 0: sin sombra para contenido normal.
- Nivel 1: sombra muy suave solo para popovers o superficies elevadas.
- Nivel 2: sombra moderada para diálogos cuando sea necesaria para separar capas.
- No usar sombras como sustituto de jerarquía visual.
- Evitar sombras coloreadas, brillos, efectos neon y glassmorphism.

Valores CSS de referencia:
- `shadow.sm`: `0 1px 2px rgba(33, 31, 28, 0.06)`
- `shadow.md`: `0 8px 24px rgba(33, 31, 28, 0.10)`
- En tema oscuro, priorizar diferencia de superficie y borde; reducir el uso de sombras negras poco perceptibles.

---

## 7. Componentes: tokens y reglas

### Botones

| Variante | Uso |
|---|---|
| Primario | Acción principal de la vista, por ejemplo “Guardar rutina” o “Añadir ejercicio” |
| Secundario | Acción alternativa relevante |
| Terciario/ghost | Acción contextual o de bajo énfasis |
| Destructivo | Eliminar una rutina o ejercicio; requiere confirmación si la acción es irreversible |
| Icon button | Acciones compactas con nombre accesible y tooltip cuando corresponda |

Reglas:
- Altura habitual: 40–44 px; en móvil, respetar un objetivo táctil de 44 px o más.
- Padding horizontal: 12–16 px.
- Radio: `radius.md`.
- Texto en peso 600.
- Un botón primario por grupo de acciones, salvo que la jerarquía de la pantalla justifique otra cosa.
- No usar terracota para todas las acciones. Las acciones secundarias deben seguir siendo claramente secundarias.
- Definir estados hover, active, focus-visible, disabled y loading.
- El estado disabled debe seguir siendo legible.
- Evitar botones de ancho completo en escritorio si no lo requieren el contexto o la jerarquía.

### Campos y formularios

- Altura objetivo: 40–44 px, salvo controles específicos.
- Label persistente sobre el campo; no depender solo del placeholder.
- Placeholder como ejemplo opcional, nunca como única etiqueta.
- Mostrar ayuda y errores junto al campo, con lenguaje concreto.
- El foco debe tener anillo visible.
- Para peso y repeticiones, usar inputs numéricos apropiados y mantener unidades visibles.
- Evitar saltos de layout cuando aparece un error; reservar espacio cuando resulte útil.

### Tarjetas

- Usar tarjetas para agrupar información relacionada, no como envoltorio automático de cada sección.
- Fondo: `color.surface`; borde de 1 px en `color.border` cuando aporte separación.
- Padding estándar: 16 px; 20–24 px para resúmenes amplios.
- Radio: `radius.lg`.
- Una tarjeta debe tener jerarquía clara: título, contenido y acciones, solo cuando sean necesarios.
- Evitar iconos decorativos grandes, degradados y badges sin significado.

### Días de entrenamiento

- Cada día debe indicar nombre y estado: con rutina, vacío, seleccionado o completado, cuando aplique.
- El día seleccionado se identifica mediante fondo suave, borde o indicador de marca y texto accesible; no solo con color.
- Los días vacíos deben invitar a añadir una rutina sin parecer errores.
- En móvil, preferir una lista vertical o selector horizontal que siga siendo usable con teclado y lector de pantalla.

### Filas y tarjetas de ejercicios

- Nombre del ejercicio como elemento principal.
- Series, repeticiones y peso como datos secundarios, con etiquetas/unidades claras.
- Acciones como editar, duplicar o eliminar deben estar agrupadas y no competir visualmente con el nombre.
- No esconder acciones esenciales en hover: en pantallas táctiles no existe hover.
- Permitir que los nombres largos se ajusten o trunquen con una forma accesible de consultar el nombre completo.
- Mantener alturas y alineación consistentes entre filas.

### Registro de series

- Una fila representa una serie y contiene: número de serie, peso, repeticiones y estado de completado.
- Los encabezados de campo deben ser claros y permanecer disponibles en móvil.
- Alinear valores numéricos verticalmente y usar cifras tabulares.
- Estado sin completar: neutro y claro.
- Estado completado: indicador visual inequívoco, color de éxito y/o icono; no usar únicamente un cambio de color.
- Al completar una serie, no borrar ni alterar los valores registrados.
- Validar entradas y manejar estados vacíos sin romper la tabla o el layout.
- En móvil, transformar la fila en un bloque compacto si una tabla horizontal requiere desplazamiento excesivo.
- No marcar automáticamente una serie como completada solo porque se haya ingresado un número, salvo que el comportamiento funcional del producto lo defina explícitamente.

### Temporizador de descanso

- Mostrar tiempo restante con números tabulares y contraste suficiente.
- Botones de pausar/reanudar y reiniciar con nombres accesibles.
- Diferenciar estados en reposo, en marcha, pausado y terminado.
- Al finalizar, dar una señal visual clara; audio o vibración solo si el producto lo soporta y el usuario puede controlarlo.
- No usar animaciones constantes que distraigan del registro de ejercicios.

### Estadísticas y gráficos

- Cada métrica debe incluir nombre, valor y unidad cuando corresponda.
- Los gráficos necesitan etiquetas, periodos y estados sin datos.
- Usar terracota y oliva con moderación; no asignar un color diferente a cada serie sin una razón.
- No depender exclusivamente del color para explicar tendencias.
- Si no hay datos suficientes, mostrar una invitación clara a registrar entrenamientos, no un gráfico vacío simulado.
- No inventar datos, mejoras, porcentajes ni récords.

### Navegación

- Escritorio: sidebar como navegación principal, con icono y etiqueta textual.
- Móvil: navegación inferior para las secciones principales; limitar la cantidad de destinos visibles y no comprimir etiquetas.
- Marcar el destino activo mediante texto, indicador y/o superficie, no solo con color.
- Mantener navegación por teclado, foco visible y orden lógico.
- Acciones contextuales como “Añadir ejercicio” pertenecen al contenido de la pantalla, no deben competir con la navegación global.

### Notas de ejercicios

- Usar un campo de texto multilínea cuando las notas puedan superar una línea.
- Diferenciar notas vacías de notas existentes.
- Mantener las notas secundarias respecto del nombre y los datos principales del ejercicio.
- No presentar notas como alertas si no existe una condición que lo justifique.

### Diálogos, popovers y confirmaciones

- Reservar diálogos para decisiones que requieren atención o confirmación.
- Preferir edición en línea o panel contextual para cambios sencillos cuando resulte más rápido.
- Toda acción destructiva debe explicar qué se elimina y si se puede recuperar.
- Mantener foco dentro de un diálogo modal, permitir cerrarlo de forma predecible y devolver el foco al elemento que lo abrió.

---

## 8. Estados visuales obligatorios

Todo componente interactivo debe definir, cuando corresponda:

- `default`: estado normal.
- `hover`: respuesta sutil en dispositivos con puntero.
- `active`: respuesta al presionar.
- `focus-visible`: anillo de foco visible para teclado.
- `selected`: elemento elegido, con señal más allá del color.
- `disabled`: no disponible, sin aparentar un error.
- `loading`: acción en curso, evitando envíos duplicados.
- `error`: problema concreto y mensaje que indique cómo corregirlo.
- `success`: acción completada o dato confirmado.
- `empty`: no hay contenido; explicar qué puede hacer el usuario.
- `skeleton`: solo cuando haya una carga real y el esqueleto represente la estructura que llegará.

No crear estados solo por decoración. Mantener la misma semántica en todos los componentes.

---

## 9. Movimiento y transiciones

- Transiciones breves: aproximadamente 120–200 ms para hover, foco y cambios de superficie.
- Usar easing natural y consistente.
- No animar cada tarjeta al cargar ni añadir rebotes sin una razón funcional.
- Respetar `prefers-reduced-motion`.
- Las animaciones no deben retrasar una acción ni impedir registrar una serie rápidamente.
- El temporizador debe actualizarse de manera clara, sin depender de animaciones visuales para indicar el tiempo real.

---

## 10. Accesibilidad y calidad

- Objetivo: WCAG 2.2 AA.
- Contraste mínimo de texto normal: 4.5:1; texto grande: 3:1.
- Controles táctiles de al menos 44 × 44 px como objetivo de diseño.
- Foco de teclado siempre visible.
- Inputs con etiquetas asociadas y mensajes de error comprensibles.
- Iconos interactivos con nombre accesible.
- No comunicar éxito, error, selección o progreso solo mediante color.
- Mantener el orden de lectura y de tabulación lógico.
- Comprobar temas claro y oscuro con texto, controles, gráficos, diálogos y estados.
- Probar tamaños de pantalla estrechos y zoom del navegador.

---

## 11. Reglas de uso de tokens

1. Consumir tokens semánticos (`color.bg`, `color.text`, `color.brand`, etc.) en componentes.
2. Evitar valores hexadecimales arbitrarios en estilos de componentes.
3. Si hace falta un nuevo valor, determinar primero si puede derivarse de un token existente.
4. Si un nuevo token es necesario, documentar nombre, valor, función y comportamiento en ambos temas.
5. No redefinir radios, sombras o espaciados localmente para un único componente sin justificación.
6. Mantener un solo sistema de tokens; si el repositorio ya usa CSS variables, Tailwind, Sass u otro mecanismo, implementar estos nombres dentro de esa arquitectura en vez de introducir una segunda fuente de verdad.
7. Revisar contraste y consistencia visual antes de aceptar un nuevo componente.

---

## 12. Resumen de decisiones

- Marca: terracota.
- Neutros: marfil, arena y carbón cálido.
- Acento secundario: oliva.
- Tipografía: Plus Jakarta Sans.
- Densidad: equilibrada.
- Bordes: finos.
- Radios: moderados, generalmente de 6–16 px según el componente.
- Navegación: sidebar en escritorio y navegación inferior en móvil.
- Prioridad de producto: planificación semanal y registro de series.
- Temas: claro y oscuro.
- Evitar: minimalismo excesivo, radios gigantes, degradados decorativos, tarjetas anidadas sin motivo, apariencia corporativa genérica y estados ambiguos.
