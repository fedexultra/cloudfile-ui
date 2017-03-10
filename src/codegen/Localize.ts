
/* tslint:disable */
declare const Localize: {msg: any, fmt: any};
const t = (k: string, a?: any) => Localize.msg.formatMessage(k, a);
export const Messages = {
  cancel: () => t('cloud-file-connector/cancel'),
  connect: () => t('cloud-file-connector/connect'),
  file: () => t('cloud-file-connector/file'),
  folder: () => t('cloud-file-connector/folder'),
  kind: () => t('cloud-file-connector/kind'),
  lastModifiedOn: () => t('cloud-file-connector/lastModifiedOn'),
  name: () => t('cloud-file-connector/name'),
  queryErrorMessage: () => t('cloud-file-connector/queryErrorMessage'),
  search: () => t('cloud-file-connector/search'),
  searchResultsMessage: () => t('cloud-file-connector/searchResultsMessage'),
  signedInAs: (a: {user: string}) => t('cloud-file-connector/signedInAs', a),
  signOut: () => t('cloud-file-connector/signOut'),
  urlErrorMessage: () => t('cloud-file-connector/urlErrorMessage'),
};export const Formatters = {
  formatMediumDate: (a: Date) => Localize.fmt.formatDate(a, {"date":"medium"}),
};
