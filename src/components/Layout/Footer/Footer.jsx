import React from 'react'
import { Link } from 'react-router-dom'

import SvgLibrary from '../../../common/SvgLibrary'

function Footer() {
    return (
        <footer className="text-gray-100 dark:text-gray-300 bg-green-700 dark:bg-green-900 border-t border-green-800/50 dark:border-green-700/50 mt-auto">
            <div className="max-w-[85rem] py-7 px-4 sm:px-6 lg:px-8 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-5 text-center">
                    <div className="flex flex-row space-x-2 items-center">
                        <img src={SvgLibrary.TtcLogoFillcolor} className="injectable w-9 h-9" alt="TTC" />
                        <p className="flex-none text-xl font-semibold">Thor Tea Cooler v1.0.1(rj)</p>
                    </div>

                    <ul className="text-center">
                        <li className="inline-block relative pr-8">
                            <Link className="inline-flex gap-x-2 hover:text-white hover:underline hover:underline-offset-4" to="/">
                                Tea Cooler
                            </Link>
                        </li>
                        <li className="inline-block relative pr-8">
                            <Link className="inline-flex gap-x-2 hover:text-white hover:underline hover:underline-offset-4" to="/configuration">
                                Configuration
                            </Link>
                        </li>
                    </ul>
                    <div className="md:text-right space-x-2">
                        <a href="https://github.com/HodoArmand/thor-tea-cooler-react-js"
                            className="inline-flex justify-center items-center text-center p-2 text-base hover:text-white hover:underline hover:underline-offset-4">
                            <img src={SvgLibrary.github} alt="G" className="injectable icon-lg mr-1" />
                            <div>Github</div>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
