"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// ----------------------------
// TYPES
// ----------------------------

type ModalContent = ReactNode | null;

type ModalPosition =
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | { x: string; y: string }; // custom tailwind override

type ModalConfig = {
  position?: ModalPosition;
  modalClassName?: string;
};

type ModalContextValue = {
  open: (content: ModalContent, config?: ModalConfig) => void;
  close: () => void;
  setContent: (content: ModalContent) => void;
  isOpen: boolean;
};

// ----------------------------
// CONTEXT
// ----------------------------

export const ModalContext = createContext<ModalContextValue | undefined>(undefined);

// ----------------------------
// PROVIDER
// ----------------------------

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContentState] = useState<ModalContent>(null);

  // CONFIG STATE (PER-OPEN)
  const [config, setConfig] = useState<ModalConfig>({
    position: "center",
    modalClassName: "",
  });

  const open = useCallback((c: ModalContent, cfg: ModalConfig = {}) => {
    setContentState(c);
    setConfig({
      position: cfg.position ?? "center",
      modalClassName: cfg.modalClassName ?? "",
    });
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const setContent = useCallback((c: ModalContent) => {
    setContentState(c);
  }, []);

  // ESC key handler
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return (
    <ModalContext.Provider value={{ open, close, setContent, isOpen }}>
      {children}

      <ModalRoot
        isOpen={isOpen}
        onClose={close}
        content={content}
        config={config}
      />
    </ModalContext.Provider>
  );
}

// ----------------------------
// HOOK
// ----------------------------

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside ModalProvider");
  return ctx;
}

// ----------------------------
// POSITIONING
// ----------------------------

function getPositionClasses(position: ModalPosition = "center") {
  if (typeof position === "object") {
    return `${position.x} ${position.y}`;
  }

  const map: Record<string, string> = {
    center: "items-center justify-center",
    top: "items-start justify-center",
    bottom: "items-end justify-center",
    left: "items-center justify-start",
    right: "items-center justify-end",
    "top-left": "items-start justify-start",
    "top-right": "items-start justify-end",
    "bottom-left": "items-end justify-start",
    "bottom-right": "items-end justify-end",
  };

  return map[position] ?? map.center;
}

// ----------------------------
// MODAL ROOT
// ----------------------------

function ModalRoot({
  isOpen,
  onClose,
  content,
  config,
}: {
  isOpen: boolean;
  onClose: () => void;
  content: ModalContent;
  config: ModalConfig;
}) {
  if (typeof window === "undefined") return null;

  const { position, modalClassName } = config;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="modal-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className={`fixed inset-0 z-50 flex p-4 ${getPositionClasses(
            position
          )} `}
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
          />

          {/* Modal container */}
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 32,
              mass: 0.8,
            }}
            className={` z-10  max-w-5xl max-md:max-w-[90vw] mx-auto absolute ${modalClassName} `}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ delay: 0.15, duration: 0.2 }}
              onClick={onClose}
              className="absolute -top-4 -right-4 z-20 p-2 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-gray-700" />
            </motion.button>

            {/* Glass container */}
            <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden ">
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent pointer-events-none" />

              <div className="relative min-h-fit md:max-h-[85vh] overflow-auto w-full ">
                {content}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}


// "use client";

// import React, {
//   createContext,
//   useContext,
//   useState,
//   ReactNode,
//   useCallback,
//   useEffect,
// } from "react";
// import { createPortal } from "react-dom";
// import { X } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";

// /*
//   GlobalModal.tsx - Revitalized Edition

//   - Exports: ModalProvider (wrap your app), useModal() hook
//   - API (hook):
//       const { open, close, setContent } = useModal();
//       open(<YourComponent />) // opens modal with content
//       close() // closes modal
//       setContent(<New />) // replace content while open

//   - Implementation notes:
//     * Uses React context for a single global modal instance
//     * Renders via a portal to document.body
//     * Uses framer-motion for smooth open/close with enhanced animations
//     * Accessible aria attributes and ESC-to-close
//     * Modern glassmorphism design with backdrop blur
//     * Children have min-h-[50vh] enforced
// */

// type ModalContent = ReactNode | null;

// type ModalContextValue = {
//   open: (content: ModalContent) => void;
//   close: () => void;
//   setContent: (content: ModalContent) => void;
//   isOpen: boolean;
// };

// const ModalContext = createContext<ModalContextValue | undefined>(undefined);

// export function ModalProvider({ children }: { children: ReactNode }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [content, setContentState] = useState<ModalContent>(null);

//   const open = useCallback((c: ModalContent) => {
//     setContentState(c);
//     setIsOpen(true);
//   }, []);

//   const close = useCallback(() => {
//     setIsOpen(false);
//   }, []);

//   const setContent = useCallback((c: ModalContent) => {
//     setContentState(c);
//   }, []);

//   // handle ESC
//   useEffect(() => {
//     function onKey(e: KeyboardEvent) {
//       if (e.key === "Escape") close();
//     }
//     if (isOpen) document.addEventListener("keydown", onKey);
//     return () => document.removeEventListener("keydown", onKey);
//   }, [isOpen, close]);

//   return (
//     <ModalContext.Provider value={{ open, close, setContent, isOpen }}>
//       {children}
//       <ModalRoot isOpen={isOpen} onClose={close} content={content} />
//     </ModalContext.Provider>
//   );
// }

// export function useModal() {
//   const ctx = useContext(ModalContext);
//   if (!ctx) throw new Error("useModal must be used inside ModalProvider");
//   return ctx;
// }

// function ModalRoot({
//   isOpen,
//   onClose,
//   content,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   content: ModalContent;
// }) {
//   // avoid rendering on server
//   if (typeof window === "undefined") return null;

//   return createPortal(
//     <AnimatePresence mode="wait">
//       {isOpen && (
//         <motion.div
//           key="modal-root"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.25, ease: "easeInOut" }}
//           className="fixed inset-0 z-50 flex items-center justify-center p-4"
//           aria-modal="true"
//           role="dialog"
//         >
//           {/* Enhanced backdrop with blur */}
//           <motion.div
//             initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
//             animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
//             exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
//             transition={{ duration: 0.3 }}
//             className="absolute inset-0 bg-black/60"
//             onClick={onClose}
//             style={{ backdropFilter: "blur(8px)" }}
//           />

//           {/* Enhanced content container with glassmorphism */}
//           <motion.div
//             initial={{ y: 50, opacity: 0, scale: 0.95 }}
//             animate={{ y: 0, opacity: 1, scale: 1 }}
//             exit={{ y: 50, opacity: 0, scale: 0.95 }}
//             transition={{
//               type: "spring",
//               stiffness: 350,
//               damping: 32,
//               mass: 0.8,
//             }}
//             className="relative z-10 max-w-4xl md:min-w-sm lg:min-w-md  max-md:w-full mx-auto"
//             onClick={(e) => e.stopPropagation()}
//             role="document"
//           >
//             {/* Close button */}
//             <motion.button
//               initial={{ opacity: 0, rotate: -90 }}
//               animate={{ opacity: 1, rotate: 0 }}
//               exit={{ opacity: 0, rotate: 90 }}
//               transition={{ delay: 0.15, duration: 0.2 }}
//               onClick={onClose}
//               className="absolute -top-4 -right-4 z-20 p-2 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
//               aria-label="Close modal"
//             >
//               <X className="w-5 h-5 text-gray-700" />
//             </motion.button>

//             {/* Glassmorphism container */}
//             <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
//               {/* Gradient overlay for depth */}
//               <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent pointer-events-none" />

//               {/* Content wrapper with min-h-[50vh] */}
//               <div className="relative min-h-[30vh] overflow-auto max-h-[85vh]">
//                 {content}
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>,
//     document.body
//   );
// }

// /*
//   Example usage:

//   // _app.tsx or root layout
//   import { ModalProvider } from './GlobalModal';

//   export default function App({ children }) {
//     return (
//       <ModalProvider>
//         {children}
//       </ModalProvider>
//     );
//   }

//   // In any component
//   import { useModal } from './GlobalModal';

//   function Example() {
//     const { open, close } = useModal();
//     return <button onClick={() => open(<MyModalContent close={close} />)}>Open</button>;
//   }

//   function MyModalContent({ close }: { close: () => void }) {
//     return (
//       <div className="p-8 space-y-4">
//         <h2 className="text-2xl font-bold">Hello from modal</h2>
//         <p>Put any React node here — forms, lists, images, etc.</p>
//         <div className="flex justify-end">
//           <button onClick={close} className="px-4 py-2 rounded-md border">Close</button>
//         </div>
//       </div>
//     );
//   }
// */
