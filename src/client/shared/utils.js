function isClient() {
  return typeof window !== 'undefined';
}

export {
  isClient
}