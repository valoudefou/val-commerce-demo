import Link from 'next/link'
import { HitType, useFlagship, useFsFlag } from "@flagship.io/react-sdk"
import { createClient } from 'contentful'

const client = createClient({
space: 'mwr46hk1hvcf',
accessToken: 'P7e2zlwtUe4ZDhEuBW9cQ8ma8ViKddL3f1oYrfCHbdk',
})

export const getStaticPaths = async () => {
const res = await client.getEntries({
content_type: 'articles'
})


const paths = res.items.map(item => {
return {
params: {slug: item.fields.slug}
}
}

)

return {
paths,
fallback: false
}
}
export async function getStaticProps({params}) {

const {items} = await client.getEntries({
    
content_type: 'articles',
'fields.slug': params.slug,
})



return {
props: {articles: items[0]}
}
}
export default function Article({articles}) {

    const fs = useFlagship()

    //get flag 
    const contentfulContent = useFsFlag("contentfulContent", "title")

return (
<div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">

{articles.fields.title}
{articles.fields.content}
</div>
)
}

