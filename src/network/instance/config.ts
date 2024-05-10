import { EEnvironment, Production } from './types.ts';

export const getBaseUrl = () => {
  if (EEnvironment.Production && EEnvironment.Production) {
    return Production
  }
  return Production
}
