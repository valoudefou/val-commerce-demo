import { useFsFlag } from "@flagship.io/react-sdk"

export default function Title() {
    const flagIndustry = useFsFlag("flagIndustry", "Product")
    return <title>{'The ' + flagIndustry.getValue() + ' House'}</title>
}