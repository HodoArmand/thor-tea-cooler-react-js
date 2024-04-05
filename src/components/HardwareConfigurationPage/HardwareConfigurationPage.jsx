import ConfigurationLayout from "../Layout/ConfigurationLayout"
import useDarkMode from '../../common/useDarkMode'

function HardwareConfigurationPage() {

    useDarkMode("config-body");

    return (
        <ConfigurationLayout>
            HW Config
        </ConfigurationLayout>
    )
}

export default HardwareConfigurationPage
