/**
 * Gets the fullname of a vuex action in a module.
 * @param {*} moduleName The name of the vuex module.
 * @param {*} actionName The name of the action.
 */
export function vuexNamespaced (moduleName, actionName) {
  return `${moduleName}/${actionName}`
}
