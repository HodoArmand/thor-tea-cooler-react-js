import { useContext, useLayoutEffect } from 'react'
import SvgLibrary from '../../../common/SvgLibrary';
import ModalContext from './ModalContext';

function Modal() {
    const data = useContext(ModalContext);

    useLayoutEffect(() => {
    }, [data.isOpen]);

    return (
        <section id="infoModal" className={(data.isOpen ? 'z-[1000]' : '!hidden -z-10 ') + " modalSection"}>
            <div className="modalWrapper">
                <div className="modalCard">
                    <div className="modalHeader">
                        <div className="inline-flex space-x-2 text-gray-800 dark:text-white">
                            <img src={SvgLibrary.infoSquare} className="injectable inline icon-md" alt="!" />
                            <h3 id="infoModalTitle" className="font-bold">
                                {data.title}
                            </h3>
                        </div>
                        <button type="button" onClick={() => data.setIsOpen(false)}
                            className="inline-flex flex-shrink-0 justify-center items-center icon-xl rounded-md text-gray-500 hover:text-gray-400 text-sm">
                            <span className="sr-only">Close</span>
                            <img src={SvgLibrary.navMenuOpened} alt="X" className="icon-sm injectable" />
                        </button>
                    </div>
                    <div className="p-4 overflow-y-auto space-y-4">
                        <p id="infoModalDesc" className="mt-1 text-gray-800 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: data.desc }}>
                        </p>
                    </div>
                    <div className="flex justify-end items-center border-t dark:border-gray-700 rounded-b-lg">
                        <button type="button" onClick={() => data.setIsOpen(false)} className="modalButton">
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Modal;
