import * as React from 'react'
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react'
import { describe, expect, test, afterEach } from 'vitest'
import { ModalProvider } from './ModalContext'
import App from '../App'

const renderWithProvider = (component) => {
  return render(
    <ModalProvider>{component}</ModalProvider>
  )
}

describe('Integration test for Modal component', () => {
  
  afterEach(cleanup)

  test('Modal should open when button is clicked', async () => {
    
    renderWithProvider(<App />)
    const openModalButton = screen.getByText('Open first modal')
    fireEvent.click(openModalButton)
    const modalContent = screen.getByText('This React modal is based on a component and a context provider.')
    
    // Modal should be open after a short CSS animation
    await waitFor(() => {
      expect(modalContent).to.exist
    }) 

  })

  test('Modal should close when escape key is pressed', async () => {
    
    renderWithProvider(<App />)
    const openModalButton = screen.getByText('Open first modal')
    fireEvent.click(openModalButton)
    const modalContent = screen.getByText('This React modal is based on a component and a context provider.')
    
    // Modal should be open after a short CSS animation
    await waitFor(() => {
      expect(modalContent).to.exist
    })
    
    // Modal can be closed by pressing escape key
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' })

    // Modal should be closed after a short CSS animation
    await waitFor(() => {
      expect(screen.queryByText('This React modal is based on a component and a context provider.')).to.be.null
    })

  })
})