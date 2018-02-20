import { SettingsIdent } from '../../../Models/Settings'
import CoreSettingsActions from './CoreSettingsActions'
import {
  WB_METRICS_OPEN_MONITOR,
  WB_METRICS_OPEN_LOG,
  WB_METRICS_RELEASE_MEMORY
} from 'shared/ipcEvents'
import { ipcRenderer } from 'electron'

class AppSettingsActions extends CoreSettingsActions {
  /* **************************************************************************/
  // Lifecycle
  /* **************************************************************************/

  /**
  * @param actions: the actions instance to use
  */
  constructor (actions) {
    super(SettingsIdent.SEGMENTS.APP, actions)
  }

  /* **************************************************************************/
  // Dispatch
  /* **************************************************************************/

  /**
  * @param ignore: true to ignore the gpu blacklist
  */
  ignoreGPUBlacklist (ignore) {
    this.dispatchUpdate('ignoreGPUBlacklist', ignore)
  }

  /**
  * @param enable: true to enable using zoom for dsf
  */
  enableUseZoomForDSF (enable) {
    this.dispatchUpdate('enableUseZoomForDSF', enable)
  }

  /**
  * @param disable: true to disable smooth scrolling
  */
  disableSmoothScrolling (disable) {
    this.dispatchUpdate('disableSmoothScrolling', disable)
  }

  /**
  * @param disable: true to disable hardware acceleration
  */
  disableHardwareAcceleration (disable) {
    this.dispatchUpdate('disableHardwareAcceleration', disable)
  }

  /**
  * @param toggled: true to check for updates
  */
  checkForUpdates (toggled) {
    this.dispatchUpdate('checkForUpdates', toggled)
  }

  /**
  * @param channel: the new update channel
  */
  setUpdateChannel (channel) {
    this.dispatchUpdate('updateChannel', channel)
  }

  /**
  * Takes the current channel of the app and glues it to the user update channel
  */
  glueCurrentUpdateChannel () {
    this.actions.glueCurrentUpdateChannel()
  }

  /**
  * @param hasSeen: true if the user has seen the app tour
  */
  setHasSeenTour (hasSeen) {
    this.dispatchUpdate('hasSeenAppTour', hasSeen)
  }

  /**
  * @param hasSeen: true if the user has seen the app wizard
  */
  setHasSeenAppWizard (hasSeen) {
    this.dispatchUpdate('hasSeenAppWizard', hasSeen)
  }

  /**
  * @param hasSeen: true if the user has seen the optimize wizard
  */
  setHasSeenOptimizeWizard (hasSeen) {
    this.dispatchUpdate('hasSeenOptimizeWizard', hasSeen)
  }

  /**
  * Sets that an account message url has been seen
  * @param url: the url to set as seen
  */
  setSeenAccountMessageUrl (url) {
    this.dispatchUpdate('lastSeenAccountMessageUrl', url)
  }

  /**
  * Sets whether the user has seen the snap update message
  * @param seen: true if seen
  */
  setHasSeenSnapSetupMessage (seen) {
    this.dispatchUpdate('hasSeenSnapSetupMessage', seen)
  }

  /**
  * Sets whether the user has seen the linux setup message
  * @param seen: true if seen
  */
  setHasSeenLinuxSetupMessage (seen) {
    this.dispatchUpdate('hasSeenLinuxSetupMessage', seen)
  }

  /**
  * Sets whether geolocation api requests are granted or not
  * @param enabled: true to enable, false to disable
  */
  setEnableGeolocationApi (enabled) {
    this.dispatchUpdate('enableGeolocationApi', enabled)
  }

  /**
  * Sets whether the metrics log should be written
  * @param write: true to write the log
  */
  setWriteMetricsLog (write) {
    this.dispatchUpdate('writeMetricsLog', write)
  }

  /**
  * Sets whether autofill is enabled
  * @param enabled: true to enable, false to disable
  */
  setEnableAutofillServie (enabled) {
    this.dispatchUpdate('enableAutofillService', enabled)
  }

  /**
  * Sets whether wavebox processes should be isolated from each other
  * @param isolate: true to isolate, false to not
  */
  setIsolateWaveboxProcesses (isolate) {
    this.dispatchUpdate('isolateWaveboxProcesses', isolate)
  }

  /**
  * Sets whether mailbox processes should be isolated from each other
  * @param isolate: true to isolate, false to not
  */
  setIsolateMailboxProcesses (isolate) {
    this.dispatchUpdate('isolateMailboxProcesses', isolate)
  }

  /**
  * Opens the metrics log
  */
  openMetricsLog () {
    if (process.type !== 'renderer') {
      throw new Error('"openMetricsLog" is only available in the renderer process')
    }
    ipcRenderer.send(WB_METRICS_OPEN_LOG, {})
  }

  /**
  * Opens the metrics monitor window
  */
  openMetricsMonitor () {
    if (process.type !== 'renderer') {
      throw new Error('"openMetricsMonitor" is only available in the renderer process')
    }
    ipcRenderer.send(WB_METRICS_OPEN_MONITOR, {})
  }

  /**
  * Attempts to free v8 memory
  */
  freeMetricsV8Memory () {
    if (process.type !== 'renderer') {
      throw new Error('"freeMetricsV8Memory" is only available in the renderer process')
    }
    ipcRenderer.send(WB_METRICS_RELEASE_MEMORY, {})
  }
}

export default AppSettingsActions
