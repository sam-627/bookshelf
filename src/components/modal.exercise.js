// 🐨 you're going to need the Dialog component
// It's just a light wrapper around ReachUI Dialog
// 📜 https://reacttraining.com/reach-ui/dialog/
import React, { Children, cloneElement, createContext, useCallback, useContext, useState } from 'react'
import { Dialog } from './lib'

// 💰 Here's a reminder of how your components will be used:
/*
<Modal>
  <ModalOpenButton>
    <button>Open Modal</button>
  </ModalOpenButton>
  <ModalContents aria-label="Modal label (for screen readers)">
    <ModalDismissButton>
      <button>Close Modal</button>
    </ModalDismissButton>
    <h3>Modal title</h3>
    <div>Some great contents of the modal</div>
  </ModalContents>
</Modal>
*/

// we need this set of compound components to be structurally flexible
// meaning we don't have control over the structure of the components. But
// we still want to have implicitly shared state, so...
// 🐨 create a ModalContext here with React.createContext
const ModalContext = createContext(null);

// 🐨 create a Modal component that manages the isOpen state (via useState)
// and renders the ModalContext.Provider with the value which will pass the
// isOpen state and setIsOpen function
const Modal = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return <ModalContext.Provider value={{ isOpen, setIsOpen }}>
    {children}
  </ModalContext.Provider>
}

// 🐨 create a ModalDismissButton component that accepts children which will be
// the button which we want to clone to set it's onClick prop to trigger the
// modal to close
// 📜 https://reactjs.org/docs/react-api.html#cloneelement
// 💰 to get the setIsOpen function you'll need, you'll have to useContext!
// 💰 keep in mind that the children prop will be a single child (the user's button)
const ModalDismissButton = ({ children }) => {
  const { setIsOpen } = useContext(ModalContext);

  const close = useCallback(() => setIsOpen(false), [setIsOpen]);

  if(Children.count(children) !== 1) throw new Error("ModalDismissButton may take only one child");

  return Children.map(children, child => cloneElement(
    child, 
    { onClick: close }
  ))
}

// 🐨 create a ModalOpenButton component which is effectively the same thing as
// ModalDismissButton except the onClick sets isOpen to true
const ModalOpenButton = ({ children }) => {
  const { setIsOpen } = useContext(ModalContext);

  const open = useCallback(() => setIsOpen(true), [setIsOpen]);

  if(Children.count(children) !== 1) throw new Error("ModalOpenButton may take only one child");

  return Children.map(children, child => cloneElement(
    child, 
    { onClick: open }
  ))
}

// 🐨 create a ModalContents component which renders the Dialog.
// Set the isOpen prop and the onDismiss prop should set isOpen to close
// 💰 be sure to forward along the rest of the props (especially children).
const ModalContents = ({ children }) => {
  const { isOpen, setIsOpen } = useContext(ModalContext);

  const close = useCallback(() => setIsOpen(false), [setIsOpen]);

  return <Dialog isOpen={isOpen} onDismiss={close}>
    {children}
  </Dialog>
}

export {
  Modal,
  ModalContents,
  ModalDismissButton,
  ModalOpenButton
}
