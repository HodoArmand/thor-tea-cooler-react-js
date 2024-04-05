import { useContext, useEffect } from 'react'

import HardwareStateContext from './HardwareStateContext';

import SvgLibrary from '../../common/SvgLibrary';

function ManualModeCard() {

    const hardwareState = useContext(HardwareStateContext);

    //  TODO: after SSE connector added, test if this comp rerenders just by getting an updated context value and if so, the useffect is unneccesary.
    useEffect(() => {

    }, [hardwareState.mode, hardwareState.relay1, hardwareState.relay2]);

    return (
        <div id="manualModeCard" className="teaControlGroupCard group">
            <div id="manualModeCardHeader" className="h-56 flex-none flex flex-row justify-center items-center bg-gray-50 dark:bg-slate-950 rounded-t-xl">
                <span className={!hardwareState.relay1 ? '!hidden' : ''}>
                    <img id="relayStateIcon1On" src={SvgLibrary.propeller} alt="❊" className="injectable icon-6xl text-green-800 dark:text-green-400" />
                </span>
                <span className={hardwareState.relay1 ? '!hidden' : ''}>
                    <img id="relayStateIcon1Off" src={SvgLibrary.propeller_off} alt="❊" className="injectable icon-6xl text-gray-700 dark:text-gray-400" />
                </span>
                <span className={!hardwareState.relay2 ? '!hidden' : ''
                }>
                    <img id="relayStateIcon2On" src={SvgLibrary.propeller} alt="❊" className="injectable icon-6xl text-green-800 dark:text-green-400" />
                </span >
                <span className={hardwareState.relay2 ? '!hidden' : ''}>
                    <img id="relayStateIcon2Off" src={SvgLibrary.propeller_off} alt="❊" className="injectable icon-6xl text-gray-700 dark:text-gray-400 " />
                </span >
            </div >
            <div id="manualModeCardMain" className="flex-auto flex flex-col justify-between p-4 md:p-6 space-y-2">
                <h2 className="mb-1 text-base font-semibold uppercase text-green-600 dark:text-green-500">
                    Manual controls
                </h2>
                <p id="manualDesc" className="text-gray-500 dark:text-gray-400">
                    Manual controls for the liquid cooling fans. Switch relay #1 or #2 with the buttons below.
                </p>
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300">
                        Cooling fan #1
                    </h3>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Status: Cooling fan #1 is <span id="relayStateDesc1">{hardwareState.relay1 ? 'On' : 'Off'}</span>.
                    </p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300">
                        Cooling fan #2
                    </h3>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Status: Cooling fan #2 is <span id="relayStateDesc2">{hardwareState.relay2 ? 'On' : 'Off'}</span>.
                    </p>
                </div>
            </div>
            <div id="manualModeCardFooter" className="flex-none teaControlGroupCardFooter">
                <button id="manualSwitchRelay1Button" type="button" className={"card-button-left hover:bg-green-200 dark:hover:bg-green-500/75 disabled:control-disabled " + (hardwareState.isApiRequesting ? ' !hidden' : '')}
                    disabled={hardwareState.mode !== 'manual'}
                    onClick={() => { hardwareState.switchRelay(1) }}>
                    <span><img src={SvgLibrary.toggle} alt="⏻" className="injectable icon-md inline mr-1 rotate-90" />Fan #1</span>
                </button>
                <button id="manualSwitchRelay1ButtonLoader" type="button" className={"card-button-left hover:bg-green-200 dark:hover:bg-green-500/75 " + (!hardwareState.isApiRequesting ? ' !hidden' : '')} disabled >
                    <img src={SvgLibrary.loader} className="injectable icon-loader" alt="loading..." />
                </button >
                <button id="manualSwitchRelay2Button" type="button" className={"card-button-right hover:bg-green-200 dark:hover:bg-green-500/75 disabled:control-disabled " + (hardwareState.isApiRequesting ? ' !hidden' : '')}
                    disabled={hardwareState.mode !== 'manual'}
                    onClick={() => { hardwareState.switchRelay(2) }}>
                    <span><img src={SvgLibrary.toggle} alt="⏻" className="injectable icon-md inline mr-1 rotate-90" />Fan #2</span>
                </button >
                <button id="manualSwitchRelay2ButtonLoader" type="button" className={"card-button-left hover:bg-green-200 dark:hover:bg-green-500/75 " + (!hardwareState.isApiRequesting ? ' !hidden' : '')} disabled >
                    <img src={SvgLibrary.loader} className="injectable icon-loader" alt="loading..." />
                </button >
            </div >
        </div >
    )
}

export default ManualModeCard
