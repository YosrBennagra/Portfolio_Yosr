declare module '*.js?url' {
  const src: string;
  export default src;
}

declare module '*.mjs?url' {
  const src: string;
  export default src;
}

declare module 'pdfjs-dist/build/pdf.worker.min.js?url' {
  const src: string;
  export default src;
}
