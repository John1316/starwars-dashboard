"use client"

import { NextUIProvider } from '@nextui-org/react'
import '../styles/style.scss'
import { useEffect } from 'react';



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const cleanBodyAttributes = () => {
      const body = document.body;

      // Get all attributes of the body tag
      const attributes = Array.from(body.attributes);

      // Remove all attributes except essential ones
      attributes.forEach(attr => {
        const name = attr.name;
        // Keep only essential attributes and remove extension-injected ones
        if (!['id', 'class', 'style'].includes(name)) {
          body.removeAttribute(name);
        }
      });
    };

    // Initial cleanup
    cleanBodyAttributes();

    // Set up a MutationObserver to catch any dynamically added attributes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          cleanBodyAttributes();
        }
      });
    });

    // Start observing the body tag for attribute changes
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-new-gr-c-s-check-loaded', 'data-gr-ext-installed']
    });

    // Cleanup
    return () => observer.disconnect();
  }, []);

 
return (
  <html lang="en">
    <head>
      <title>Valify</title>
    </head>
    <body>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </body>
  </html>
)
}
