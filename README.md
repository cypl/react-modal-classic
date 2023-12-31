# React Modal Classic

An easy-to-use and classic javascript React modal, that allows you to pop out *“one modal at a time”* in your React App.
[See it in action here.](https://react-modal-classic.cyrille.dev/) 

## Why this module?

This module can be used for your basic modal needs, like:
- showing a confirmation message
- collecting informations with a form
- showing a login form
- visualize a media
- getting informations on a specific element…

It can show every content you need, following this idea: *“one modal at a time”*… which means, that you can't open more than one modal at the same time in the viewport. 

## How to install?

This module can be installed from npm using this command line:
```
npm i react-modal-classic
```

### Dependencies:

Your React projet should run with these dependencies:
- Styled Components (version ≥6.0.4)
- React (version ≥18.0.0)
- React Dom (version ≥18.0.0)

## How to use?

### 1- Set the modal context provider:

This modal runs with the Context API of React, so your first task is to set the ModalProvider component in your application.

**Case 1:** If your application use React Router library, and you want to be able to use the NavLink component in your modal content, ModalProvider should be set inside the BrowserRouter component.  

```jsx
import { BrowserRouter, Routes } from "react-router-dom"
import { ModalProvider } from "react-modal-classic"

function Router(){
    return (
        <BrowserRouter>
            <ModalProvider>
                <Routes>
                    {/* ... */}
                </Routes>
            </ModalProvider>
        </BrowserRouter>
    )
}

export default Router
```
**Case 2:** Else, you don't need router components in your modal contents, you can just set the ModalProvider component in **main.jx**:

```jsx
import React from "react"
import ReactDOM from "react-dom/client"
import { ModalProvider } from "react-modal-classic"
import App from "./App"

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ModalProvider>
            <App />
        </ModalProvider>
    </React.StrictMode>
)
```

### 2- Open the modal with a function:
Now, you can launch the modal everywhere in your app, directly from a function named openModal(), by setting the content of the modal as a parameter. The openModal() function has to be imported from ModalContext, that you have previously set with the ModalProvider component.
```jsx
import React, { useContext } from "react"
import { ModalContext } from "react-modal-classic"
import ModalContent from "./components/ModalContent"

const App = () => {
    const { openModal } = useContext(ModalContext)
    return (
        <main>
            <Button onClick={() => openModal(<ModalContent/>)}>Open modal</Button>
        </main>
    )
}

export default App
```
### 3- Add a callback function when closing modal:
You can pass a callback function as a parameter in the the openModal() function. This function triggers when the user close the modal, and is optional.
```jsx
import React, { useContext } from 'react'
import styled from "styled-components"
import { ModalContext } from './lib/ModalContext'
import ModalContent from './components/ModalContent'

const App = () => {
    const { openModal } = useContext(ModalContext)
    const onCloseCallback = (name) => {console.log("Hello " + name)}
    return (
        <main>
            <Button onClick={() => openModal(<ModalContent/>, () => onCloseCallback("Robin!"))}>Open modal</Button>
        </main>
    )
}
export default App
```

### 4- Customize the look of your modals:
#### a- Options by default
Right from the box, the modal component is set with these default options:
```javascript
const defaultOptions = {
    closeButton: "out", // has to be "out", "in" or "none"
    closeButtonColor: "#fff", // should be a color value "red", "rgba(255,0,0,0.5)", "#242424"…
    size: "md", // has to be "sm", "md", "lg", "xl"
    backgroundColor: "#fff", // should be a color value "pink", "rgba(120,120,120,0.8)", "#242424"…
    radius: "6px" // should be a size value "5px", "0.5rem"…
}
``` 
#### b- Set different options in the function
You can pass options as a parameter object in the openModal() function. It can be usefull if you have different kinds of contents in your app that need to be shown in a modal. This is optional.
Here are two examples:
```jsx
import React, { useContext } from "react"
import { ModalContext } from "react-modal-classic"
import ModalContentForm from "./components/ModalContentForm"
import ModalContentMedia from "./components/ModalContentMedia"

const App = () => {
    
    const { openModal } = useContext(ModalContext)
    const modalFormOptions = { closeButton: "in", backgroundColor: "#999", size: "md" }
    const modalMediaOptions = { closeButton: "none", size: "xl", radius: "none" }
    const onCloseCallback = (name) => {console.log("Hello " + name)}

    return (
        <main>
            <button onClick={() => openModal(<ModalContentForm/>, modalFormOptions)}>Open a form</button>
            <button onClick={() => openModal(<ModalContentMedia/>, () => onCloseCallback("Robin!"), modalMediaOptions)}>Open a media</button>
        </main>
    )
}

export default App
```
Note that in the second example, it is possible to use 3 parameters in the openModal() function : 
- the content as a JSX component (required)
- a callback function that triggers when user close the modal (optional)
- an object that defines styles of the modal (optional)

### 5- Close the modal
Modal can be closed by :
- clicking the close button (close icon at the top right corner of the modal)
- clicking somewhere in the background
- pressing the escape key of your keyboard

Note that if your application requires a function to close the modal, you can import it from ModalContext to do so:
```jsx
import React, { useContext } from 'react'
import { ModalContext } from "react-modal-classic"

function ModalContent(){
    
    const { closeModal } = useContext(ModalContext)

    return (
        <div>
            <p>This React modal is based on a component and a context provider.<br/>
                <button onClick={closeModal}>Close</button>
            </p>
        </div>
    )
}

export default ModalContent
```

# License

This module is available under MIT licence, feel free to use it in your React web projects. 