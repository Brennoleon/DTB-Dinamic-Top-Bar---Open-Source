# Dinamic Top Bar

A stack-based and fully dynamic Top Bar state manager for **React 18+** and **Next.js App Router**.
Built to handle complex UI flows with predictable state restoration, while staying lightweight and SSR-safe.

---

## Features

* 🚀 Stack-based state management (`push` / `pop`)
* ⚡ Zero-config default UI with `TopBarDefault`
* 🎨 Fully customizable (layout, buttons, blur, sticky, styles)
* ⚛️ React 18+ and Next.js App Router ready
* 🌐 SSR safe
* 📦 Lightweight, no Redux or Zustand

---

## Installation

```bash
git clone https://github.com/Brennoleon/DTB-Dinamic-Top-Bar---Open-Source
```

---

## Usage

### 1. Wrap your application

Wrap your root layout with `TopBarProvider`.
You can also include the default renderer `TopBarDefault`.

```tsx
// app/layout.tsx
import { TopBarProvider, TopBarDefault } from "dinamic-top-bar"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TopBarProvider>
          <TopBarDefault />
          {children}
        </TopBarProvider>
      </body>
    </html>
  )
}
```

---

### 2. Control the Top Bar from any page

Use the `useTopBar` hook to update the Top Bar state.

```tsx
"use client"

import { useEffect } from "react"
import { useTopBar } from "dinamic-top-bar"

export default function HomePage() {
  const { set } = useTopBar()

  useEffect(() => {
    set({
      visible: true,
      style: {
        background: "rgba(0,0,0,0.8)",
        blur: 10
      },
      layout: {
        title: <span>My App</span>,
        rightButtons: [
          {
            id: "login",
            content: "Login",
            onClick: () => console.log("Login")
          }
        ]
      }
    })
  }, [])

  return <div>My Page Content</div>
}
```

---

### 3. Stack-based behavior (Push / Pop)

Ideal for modals, flows, or temporary views.
When the component unmounts, the previous Top Bar state is automatically restored.

```tsx
import { useTopBarStack } from "dinamic-top-bar"

export default function ModalPage() {
  useTopBarStack({
    style: { background: "red" },
    layout: { title: "Danger Zone" }
  })

  return <div>Modal Content</div>
}
```

---

## API

### TopBarStyle

|           Property | Type          | Description                     |
| -----------------: | ------------- | ------------------------------- |
|             height | number        | Height in pixels                |
|           paddingX | number        | Horizontal padding              |
|                gap | number        | Vertical gap between rows       |
|         background | string        | CSS background                  |
|         foreground | string        | Text color                      |
|             border | string        | CSS border                      |
|             radius | number        | Border radius                   |
|             shadow | string        | CSS box-shadow                  |
|               blur | number        | Backdrop blur amount            |
|            opacity | number        | Opacity value                   |
|             sticky | boolean       | Uses `position: sticky`         |
|             zIndex | number        | Z-index                         |
|   backdropSaturate | number        | Backdrop saturate factor        |
| backdropBrightness | number        | Backdrop brightness factor      |
|        transitions | boolean       | Enables transitions             |
|          className | string        | ClassName applied to `<header>` |
|              style | CSSProperties | Extra inline styles             |

### TopBarLayout

| Field                      | Type      | Description                 |
| -------------------------- | --------- | --------------------------- |
| left / center / right      | ReactNode | Main layout slots           |
| title / subtitle           | ReactNode | Center title elements       |
| beforeTitle / afterTitle   | ReactNode | Extra nodes around title    |
| leftButtons / rightButtons | Array     | Button configs              |
| floating                   | ReactNode | Absolute positioned content |
| below                      | ReactNode | Content below main row      |

### TopBarButton

| Field                | Type          | Description         |
| -------------------- | ------------- | ------------------- |
| id                   | string        | Unique button id    |
| onClick              | () => void    | Click handler       |
| disabled             | boolean       | Disabled state      |
| ariaLabel            | string        | Accessibility label |
| content              | ReactNode     | Main content        |
| leftIcon / rightIcon | ReactNode     | Optional icons      |
| style                | CSSProperties | Inline style        |
| className            | string        | ClassName           |

---

## License

```text
MIT
```

---

Feito com s2 por Brenno Leon


