<<<<<<< HEAD
import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
  } from "./toast"  // Chemin relatif
  import { useToast } from "./use-toast"  // Chemin relatif
  
  export function Toaster() {
    const { toasts } = useToast()
  
    return (
      <ToastProvider>
        {toasts.map(function ({ id, title, description, action, ...props }) {
          return (
            <Toast key={id} {...props}>
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
              {action}
              <ToastClose />
            </Toast>
          )
        })}
        <ToastViewport />
      </ToastProvider>
    )
=======
import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
  } from "./toast"  // Chemin relatif
  import { useToast } from "./use-toast"  // Chemin relatif
  
  export function Toaster() {
    const { toasts } = useToast()
  
    return (
      <ToastProvider>
        {toasts.map(function ({ id, title, description, action, ...props }) {
          return (
            <Toast key={id} {...props}>
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
              {action}
              <ToastClose />
            </Toast>
          )
        })}
        <ToastViewport />
      </ToastProvider>
    )
>>>>>>> 9d7972c328e4c9a16471781771699d890d61465d
  }