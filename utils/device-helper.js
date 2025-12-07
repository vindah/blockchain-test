export function isMobile(testInfo) {
  return testInfo?.project?.use?.DEVICE_TYPE === 'mobile';
}
