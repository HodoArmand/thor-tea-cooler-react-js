import ConfigurationLayout from "../Layout/ConfigurationLayout"
import useDarkMode from '../../common/useDarkMode'

function ServerConfigurationPage() {

    useDarkMode("config-body");

    return (
        <ConfigurationLayout>
            ServerConfigurationPage
        </ConfigurationLayout>
    )
}

export default ServerConfigurationPage
