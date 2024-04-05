import ConfigurationLayout from "../Layout/ConfigurationLayout"
import useDarkMode from '../../common/useDarkMode'

function ConfigurationPage() {

    useDarkMode("config-body");

    return (
        <ConfigurationLayout>
            Config
        </ConfigurationLayout>
    )
}

export default ConfigurationPage
