import { useContext, useEffect } from 'react'

import HardwareStateContext from './HardwareStateContext';

import SvgLibrary from '../../common/SvgLibrary';

function OpModeCard() {

    const hardwareState = useContext(HardwareStateContext);

    //  TODO: after SSE connector added, test if this comp rerenders just by getting an updated context value and if so, the useffect is unneccesary.
    useEffect(() => {

    }, [hardwareState.mode]);

    const opModesCardMainText = {
        unset: {
            heading: 'Manual',
            text: 'The TTC device is in manual mode, the cooling fans can be freely controlled and the target temperature can be adjusted any time.',
        },
        manual: {
            heading: 'Manual',
            text: 'The TTC device is in manual mode, the cooling fans can be freely controlled and the target temperature can be adjusted any time.',
        },
        autoReady: {
            heading: 'Automatic- Ready',
            text: 'The TTC device is in automatic ready mode, the target temperature can be adjusted and the automatic cooling progress can be started.',
        },
        autoCooling: {
            heading: 'Automatic - Cooling',
            text: 'The TTC device is in automatic cooling mode, the target temperature can be adjusted and the automatic cooling progress can be stopped.',
        },
        autoFinished: {
            heading: 'Automatic - Finished',
            text: 'The beverage has been cooled to the desired temperature. Choose either Automatic or Manual mode to start a new cooling progress.',
        },
    }

    return (
        <div id="opModesCard" className="teaControlGroupCard group">
            <div id="opModesCardHeader" className="h-56 flex-none flex flex-col justify-center items-center bg-gray-50 dark:bg-slate-950 rounded-t-xl">
                <span className={hardwareState.mode !== 'manual' && 'hidden'}>
                    <img id="modeIconManual" src={SvgLibrary.modes.manual} className="injectable mode-icon" alt="⚙" />
                </span>
                <span className={hardwareState.mode !== 'autoReady' && 'hidden'}>
                    <img id="modeIconAutoReady" src={SvgLibrary.modes.autoReady} className="injectable mode-icon" alt="⚙" />
                </span>
                <span className={hardwareState.mode !== 'autoCooling' && 'hidden'}>
                    <img id="modeIconAutoCooling" src={SvgLibrary.modes.autoCooling} className="injectable mode-icon" alt="⚙" />

                </span>
                <span className={hardwareState.mode !== 'autoFinished' && 'hidden'}>
                    <img id="modeIconAutoFinished" src={SvgLibrary.modes.autoFinished} className="injectable mode-icon" alt="⚙" />

                </span>
            </div>
            <div id="opModesCardMain" className="flex-auto flex flex-col justify-between p-4 md:p-6 space-y-2">
                <h2 className="block mb-1 text-base font-semibold uppercase text-green-600 dark:text-green-500">
                    Operating mode
                </h2>
                <h3 id="modeTitle" className="mode-title">
                    {opModesCardMainText[hardwareState.mode].heading}
                </h3>
                <p id="modeDesc" className="mode-desc">
                    {opModesCardMainText[hardwareState.mode].text}
                </p>
                <div>
                    <h4 className="block mt-3 mb-1 text-base font-semibold uppercase text-green-600 dark:text-green-500 text-center">
                        Automatic Controls
                    </h4>
                    <div className="mt-2 w-full flex justify-center">
                        <div className="inline-flex rounded-md shadow-sm w-fit">
                            <button id="modeAutoStart" type="button" onClick={() => hardwareState.postMode('startAutoCooling')} disabled={hardwareState.mode !== 'autoReady'}
                                className={"button-group-left-right hover:bg-green-200 dark:hover:bg-green-500/75 disabled:control-disabled " + (hardwareState.isApiRequesting && ' !hidden')}>
                                <span><img src={SvgLibrary.start} className="injectable icon-md inline mr-1" alt="🡢" />Start</span>
                            </button>
                            <button id="modeAutoStartLoader" type="button"
                                className={"button-group-left-right hover:bg-green-200 dark:hover:bg-green-500/75 " + (!hardwareState.isApiRequesting && ' !hidden')} disabled>
                                <img src={SvgLibrary.loader} className="injectable icon-loader" alt="loading..." />
                            </button>
                            <button id="modeAutoStop" type="button" onClick={() => hardwareState.postMode('stopAutoCooling')} disabled={hardwareState.mode !== 'autoCooling'}
                                className={"button-group-left-right hover:bg-rose-200 dark:hover:bg-rose-500/75 disabled:control-disabled " + (hardwareState.isApiRequesting && ' !hidden')}>
                                <span><img src={SvgLibrary.stop} className="injectable icon-md inline mr-1" alt="■" />Stop</span>
                            </button>
                            <button id="modeAutoStopLoader" type="button"
                                className={"button-group-left-right hover:bg-rose-200 dark:hover:bg-rose-500/75 " + (!hardwareState.isApiRequesting && ' !hidden')} disabled>
                                <img src={SvgLibrary.loader} className="injectable icon-loader" alt="loading..." />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="opModesCardFooter" className="flex-none teaControlGroupCardFooter">
                <button id="modeButtonAuto" className={"card-button-left hover:bg-green-200 dark:hover:bg-green-500/75 disabled:control-disabled " + (hardwareState.isApiRequesting && ' !hidden')}
                    onClick={() => hardwareState.postMode('setModeAuto')}>
                    <span><img src={SvgLibrary.modes.autoReady} className="injectable icon-md inline mr-1" alt="⚙" />Automatic</span>
                </button>
                <button id="modeButtonAutoLoader" className={"card-button-left hover:bg-green-200 dark:hover:bg-green-500/75 " + (!hardwareState.isApiRequesting && ' !hidden')} disabled>
                    <img src={SvgLibrary.loader} className="injectable icon-loader" alt="loading..." />
                </button>
                <button id="modeButtonManual" className={"card-button-right hover:bg-rose-200 dark:hover:bg-rose-500/75 disabled:control-disabled " + (hardwareState.isApiRequesting && ' !hidden')}
                    onClick={() => hardwareState.postMode('setModeManual')}>
                    <span><img src={SvgLibrary.modes.manual} className="injectable icon-md inline mr-1" alt="⚙" />Manual</span>
                </button>
                <button id="modeButtonManualLoader" className={"card-button-right hover:bg-rose-200 dark:hover:bg-rose-500/75 " + (!hardwareState.isApiRequesting && ' !hidden')} disabled>
                    <img src={SvgLibrary.loader} className="injectable icon-loader" alt="loading..." />
                </button>
            </div>
        </div >
    )
}

export default OpModeCard
