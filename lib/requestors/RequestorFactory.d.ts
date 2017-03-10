import { Provider } from '../types/ShimTypes';
import { ProviderInfo } from '../providers/ProviderInfo';
import { Requestor } from './Requestor';
declare class RequestorFactory {
    static getRequestor(provider: Provider, providerInfo: ProviderInfo): Requestor;
}
export { RequestorFactory };
