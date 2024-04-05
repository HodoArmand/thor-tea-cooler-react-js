import ConfigurationLayout from "../Layout/ConfigurationLayout"
import useDarkMode from '../../common/useDarkMode'

function UserConfigurationPage() {

    useDarkMode("config-body");

    return (
        <ConfigurationLayout>
            UserConfigurationPage
        </ConfigurationLayout>
    )
}

export default UserConfigurationPage
