import { useState, useContext } from 'react'

import HardwareStateContext from './HardwareStateContext';

import SvgLibrary from '../../common/SvgLibrary';
import { formatFloat } from "../../common/hardwareStateUtils";
import TemperatureLineChart from './TemperatureLineChart';

function TemperaturesCard() {

    const hardwareState = useContext(HardwareStateContext);

    const [newTargetTemperature, setNewTargetTemperature] = useState(hardwareState.targetTemperature);

    return (
        <div id="temperaturesCard" className="teaControlGroupCard group">
            <div id="temperaturesCardHeader" className="flex flex-row relative h-56 w-full bg-gray-50 dark:bg-slate-950 rounded-t-xl p-2">
                <TemperatureLineChart chartData={hardwareState.chartData} />
            </div>
            <div id="temperaturesCardMain" className="p-4 md:p-6">
                <h2 className="block mb-1 text-base font-semibold uppercase text-green-600 dark:text-green-500">
                    Temperatures
                </h2>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                    Current temperature
                </h3>
                <div className="my-2 text-gray-600">
                    <div className="flex w-full h-8 bg-gray-200 rounded-lg overflow-hidden dark:bg-gray-700">
                        <div id="temperatureBar" className="flex flex-col justify-center overflow-hidden bg-yellow-300 text-black font-semibold text-center" role="progressbar"
                            style={{ width: (((hardwareState.temperature / 100) * 100) % 100) + '%' }}>
                            <span><span id="temperature">{formatFloat(hardwareState.temperature)}</span>℃</span>
                        </div>
                    </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 dark:hover:text-white">
                    Target temperature
                </h3>
                <div className="my-2 text-gray-600">
                    <div className="flex w-full h-8 bg-gray-200 rounded-lg overflow-hidden dark:bg-gray-700">
                        <div id="targetTemperatureBar" className="flex flex-col justify-center overflow-hidden bg-blue-300 text-black font-semibold text-center" role="progressbar"
                            style={{ width: (((hardwareState.targetTemperature / 100) * 100) % 100) + '%' }}>
                            <span><span id="targetTemperature">{formatFloat(hardwareState.targetTemperature)}</span>℃</span>
                        </div>
                    </div>
                </div>
                <label htmlFor="targetTemperatureRangeSlider" className="sr-only">Set Target temperature</label>
                <div className="grid grid-cols-1 gap-4 place-items-center lg:flex lg:flex-row lg:items-center space-x-2 py-2 mt-4">
                    <div className="w-full sm:w-4/5 md:w-4/5 flex flex-row justify-center lg:justify-between space-x-2">
                        <div className="flex flex-row font-semibold text-blue-500 dark:text-blue-300 w-14 justify-center items-center">20 ℃</div>
                        <input id="targetTemperatureRangeSlider" type="range" min="20" max="75" value={newTargetTemperature} step="1.0"
                            className="target-temp-slider" onInput={(e) => { setNewTargetTemperature(e.target.value) }} />
                        <div className="flex flex-row font-semibold text-red-600 dark:text-red-500 w-14 justify-center items-center">75 ℃</div>
                    </div>
                    <button id="setTargetTemperatureRangeSliderButton" type="button" onClick={() => hardwareState.postTargetTemperature(newTargetTemperature)}
                        disabled={hardwareState.isApiRequesting}
                        className={"button-set-temp lg:w-1/5 hover:bg-green-200 dark:hover:bg-green-500/75 disabled:control-disabled " + (hardwareState.isApiRequesting && ' !hidden')}>
                        <span className="flex flex-row font-semibold"><img src={SvgLibrary.mug} className="injectable icon-md inline mr-1" alt="☕" />➔ <span
                            id="targetTemperatureRangeButtonCelsius">{newTargetTemperature}</span>℃</span>
                    </button>
                    <button id="setTargetTemperatureRangeSliderButtonLoader" type="button"
                        className={"button-set-temp lg:w-1/5 cursor-progress " + (!hardwareState.isApiRequesting && ' !hidden')} disabled>
                        <img src={SvgLibrary.loader} className="injectable icon-loader" alt="loading..." />
                    </button>
                </div>
            </div>
            <div id="temperaturesCardFooter" className="teaControlGroupCardFooter">
                <button id="targetTemperatureDecreaseButton" className={"card-button-left hover:bg-sky-200 dark:hover:bg-sky-500/75 disabled:control-disabled " + (hardwareState.isApiRequesting && ' !hidden')}
                    onClick={() => { hardwareState.postTargetTemperature(hardwareState.targetTemperature - 1) }}
                    disabled={hardwareState.targetTemperature <= 20.00}>
                    <span><img src={SvgLibrary.mug} className="injectable icon-md inline mr-1" alt="☕" />-1℃</span>
                </button>
                <button id="targetTemperatureDecreaseButtonLoader" className={"card-button-left cursor-progress " + (!hardwareState.isApiRequesting && ' !hidden')} disabled>
                    <img src={SvgLibrary.loader} className="injectable icon-loader" alt="loading..." />
                </button>
                <button id="targetTemperatureIncreaseButton" className={"card-button-right hover:bg-rose-200 dark:hover:bg-rose-500/75 disabled:control-disabled " + (hardwareState.isApiRequesting && ' !hidden')}
                    onClick={() => { hardwareState.postTargetTemperature(hardwareState.targetTemperature + 1) }}
                    disabled={hardwareState.targetTemperature >= 75.00}>
                    <span><img src={SvgLibrary.mug} className="injectable icon-md inline mr-1" alt="☕" />+1℃</span>
                </button>
                <button id="targetTemperatureIncreaseButtonLoader" className={"card-button-left cursor-progress " + (!hardwareState.isApiRequesting && ' !hidden')} disabled>
                    <img src={SvgLibrary.loader} className="injectable icon-loader" alt="loading..." />
                </button>
            </div>
        </div>
    )
}

export default TemperaturesCard
