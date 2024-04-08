import SvgLibrary from "../../common/SvgLibrary"

function ConfigPageContentContainerLoader({ isLoaded, title }) {
    return (
        <div id="configPageContentContainerLoader" className={(isLoaded ? 'hidden' : '') + " container w-full sm:w-fit flex flex-row justify-center content-center px-2 sm:px-10 py-5 sm:m-5 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm sm:rounded-lg shadow-md"}>
            <div className="w-fit h-full flex flex-col space-y-2 pt-2">
                <h2 className="dark:text-gray-50">{title}</h2>
                <div className="dark:text-gray-100">
                    Loading Configuration values...
                </div>
                <img src={SvgLibrary.loader} className="injectable icon-loader mx-auto my-4" alt="loading..." />
            </div>
        </div>
    )
}

export default ConfigPageContentContainerLoader
