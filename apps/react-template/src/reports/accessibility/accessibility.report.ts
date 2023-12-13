/**
 * Happens only in DEVELOPMENT
 */
const reportAccessibility = async (): Promise<void> => {
  if (__DEV__) {
    const [axe, ReactInstance, ReactDOMInstance] = await Promise.all([
      (await import('@axe-core/react')).default,
      (await import('react')).default,
      (await import('react-dom/client')).default,
    ]);
    await axe(ReactInstance, ReactDOMInstance, 500);
  }
};

export default reportAccessibility;
