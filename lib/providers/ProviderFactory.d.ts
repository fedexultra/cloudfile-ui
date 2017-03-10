import { Provider } from '../types/ShimTypes';
import { ProviderInfo } from './ProviderInfo';
declare class ProviderInfoFactory {
    static getProviderInfo(provider: Provider): ProviderInfo;
}
export { ProviderInfoFactory };
